const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const { getUserId, APP_SECRET } = require("../utils.ts");

async function signup(parent, args, context, info) {
  // 1
  const hashedPassword = await bcrypt.hash(args.password, 10);
  // 2
  const { password, ...user } = await context.prisma.createUser({
    ...args,
    password: hashedPassword,
  });

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 4
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  // 1
  const { password, ...user } = await context.prisma.user({
    username: args.username,
  });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcrypt.compare(args.password, password);
  if (!valid) {
    throw new Error("Username or password incorrect");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
}

module.exports = {
  signup,
  login,
};
