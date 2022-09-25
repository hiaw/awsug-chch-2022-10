import { App } from "@serverless-stack/resources";
import { Api } from "./Api";
import { Web } from "./Web";
import { Database } from "./Database";
import { Secrets } from "./Secrets";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app
    .stack(Secrets)
    .stack(Database)
    .stack(Api)
    .stack(Web);
}
