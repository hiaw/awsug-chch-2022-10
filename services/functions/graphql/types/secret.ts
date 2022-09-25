import { Config } from "@serverless-stack/node/config";
import { builder } from "../builder";

const SecretType = builder.objectRef<{ key: string }>("Secret").implement({
  fields: (t) => ({
    key: t.exposeString("key"),
  }),
});

builder.queryFields((t) => ({
  secret: t.field({
    type: SecretType,
    resolve: async () => {
      return { key: Config.SECRET_KEY };
    },
  }),
}));
