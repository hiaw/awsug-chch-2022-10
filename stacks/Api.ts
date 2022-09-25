import {
  StackContext,
  use,
  Api as ApiGateway,
  Config,
} from "@serverless-stack/resources";
import { Database } from "./Database";
import { Secrets } from "./Secrets";

export function Api({ stack }: StackContext) {
  const db = use(Database);
  const { SECRET_KEY } = use(Secrets);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        permissions: [db.table],
        config: [db.TABLE_NAME, SECRET_KEY],
      },
    },
    routes: {
      "POST /graphql": {
        type: "pothos",
        function: {
          handler: "functions/graphql/graphql.handler",
        },
        schema: "services/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
        ],
      },
    },
  });

  new Config.Parameter(stack, "API_URL", {
    value: api.url,
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
