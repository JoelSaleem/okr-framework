import { schema } from "nexus";
import { getUserId } from "../utils";
import { decodeBase64 } from "bcryptjs";

schema.objectType({
  name: "Objective",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("description");
    t.field("user", {
      type: "User",
      resolve(root, args, ctx) {
        if (!root.id) {
          return null;
        }
        return ctx.db.objecive
          .findOne({
            where: {
              id: root.id,
            },
          })
          .user();
      },
    });
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("objectives", {
      type: "Objective",
      nullable: false,
      list: true,
      async resolve(_root, _args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        const user = await ctx.db.user.findOne({
          where: {
            id: userId,
          },
        });

        const obj = await ctx.db.objecive.findMany({
          where: {
            user: {
              id: userId,
            },
          },
        });

        console.log(obj);
        return obj;
      },
    });
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("createObjective", {
      type: "Objective",
      args: {
        title: schema.stringArg({ required: true }),
        description: schema.stringArg({ required: true }),
      },
      nullable: false,
      resolve(_root, args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        return ctx.db.objecive.create({
          data: {
            createdAt: new Date(),
            description: args.description,
            title: args.title,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
      },
    });
  },
});
