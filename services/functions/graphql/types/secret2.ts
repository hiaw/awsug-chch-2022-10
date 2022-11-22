import { Config } from "@serverless-stack/node/config";
import { builder } from "../builder";

const Secret2Type = builder.objectRef<{ key: string }>("Secret2").implement({
  fields: (t) => ({
    key: t.exposeString("key"),
  }),
});

builder.queryFields((t) => ({
  secret2: t.field({
    type: Secret2Type,
    resolve: async () => {
      return { key: Config.SECRET_KEY };
    },
  }),
}));
