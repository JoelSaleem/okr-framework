import { schema } from "nexus";
import { getUserId } from "../utils";

schema.objectType({
  name: "Objective",
  definition(t) {
    t.int("id");
    t.string("title");
    t.string("description");
    t.date("createdAt");
    t.field("parentObjective", {
      type: "Objective",
      resolve(root, args, ctx) {
        if (!root.id) {
          return null;
        }
        return ctx.db.objective
          .findOne({
            where: {
              id: root.id,
            },
          })
          .parentObjective(); 
      },
    }),
      t.field("user", {
        type: "User",
        resolve(root, args, ctx) {
          if (!root.id) {
            return null;
          }
          return ctx.db.objective
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

        return ctx.db.objective.findMany({
          where: {
            user: {
              id: userId,
            },
          },
        });
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
        parentObjective: schema.intArg({ required: false }),
      },
      nullable: false,
      resolve(_root, args, ctx) {
        const userId = getUserId(ctx);
        if (!userId) {
          throw new Error("Not authorized");
        }

        const data: any = {
          createdAt: new Date(),
          description: args.description,
          title: args.title,
          user: {
            connect: {
              id: userId,
            },
          },
        };

        if (args.parentObjective) {
          data.parentObjective = {
            connect: {
              id: args.parentObjective,
            },
          };
        }

        return ctx.db.objective.create({ data });
      },
    });
  },
});
