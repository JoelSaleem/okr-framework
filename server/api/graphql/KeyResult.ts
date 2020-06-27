import { schema } from "nexus";
import { getUserId } from "../utils";

schema.objectType({
  name: "KeyResult",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("description");
    t.int("target");
    t.int("current");
    t.date("createdAt");
    t.field("user", {
      type: "User",
      resolve(root, args, ctx) {
        if (!root.id) {
          return null;
        }
        return ctx.db.keyResult
          .findOne({
            where: {
              id: root.id,
            },
          })
          .user();
      },
    });
    t.field("objective", {
      type: "Objective",
      resolve(root, args, ctx) {
        if (!root.id) {
          return null;
        }

        return ctx.db.keyResult
          .findOne({
            where: {
              id: root.id,
            },
          })
          .objective();
      },
    });
  },
});

schema.extendType({
  type: "Query",
  definition(t) {
    t.field("keyResults", {
      type: "KeyResult",
      nullable: false,
      list: true,
      async resolve(root, args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        return ctx.db.keyResult.findMany({
          where: {
            userId,
          },
        });
      },
    });
    t.field("keyResult", {
      type: "KeyResult",
      nullable: false,
      args: { id: schema.intArg() },
      async resolve(root, { id }, ctx) {
        const userId = getUserId(ctx);
        if (!userId || !id) {
          throw new Error("Not authorized");
        }

        const kr = await ctx.db.keyResult.findOne({
          where: {
            id,
          },
        });

        if (kr?.userId !== userId) {
          throw new Error("Not authorized");
        }

        return kr;
      },
    });
  },
});

schema.extendType({
  type: "Mutation",
  definition(t) {
    t.field("createKeyResult", {
      type: "KeyResult",
      args: {
        title: schema.stringArg({ required: true }),
        description: schema.stringArg({ required: false }),
        target: schema.intArg({ required: true }),
        objective: schema.intArg({ required: true }),
      },
      resolve(root, args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        return ctx.db.keyResult.create({
          data: {
            title: args.title,
            description: args.description,
            createdAt: new Date(),
            current: 0,
            target: args.target,
            objective: {
              connect: {
                id: args.objective,
              },
            },
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
