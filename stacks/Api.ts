import {
  StackContext,
  use,
  Api as ApiGateway,
  Auth,
} from "@serverless-stack/resources";
import { Database } from "./Database";
import { Secrets } from "./Secrets";

export function Api({ stack }: StackContext) {
  const table = use(Database);
  const { SECRET_KEY, GOOGLE_CLIENT_ID } = use(Secrets);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [table, SECRET_KEY],
      },
    },
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "functions/graphql/graphql.handler",
        },
        pothos: {
          schema: "services/functions/graphql/schema.ts",
          output: "graphql/schema.graphql",
          commands: [
            "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
          ],
        },
      },
    },
  });

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "functions/auth/auth.handler",
      bind: [GOOGLE_CLIENT_ID],
    },
  });

  auth.attach(stack, {
    api,
    prefix: "/auth", // optional
  });

  stack.addOutputs({
    API: api.url,
  });

  return api;
}
