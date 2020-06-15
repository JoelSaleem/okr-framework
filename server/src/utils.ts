import { Context } from "prisma-client-lib/dist/types";

const jwt = require("jsonwebtoken");
let APP_SECRET = "9i3adhkJdb38Hls"; // Todo: actually make this secret

let getUserId = (context: Context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
};

module.exports = {
  APP_SECRET,
  getUserId,
};
