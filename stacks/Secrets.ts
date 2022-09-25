import { Config, StackContext } from "@serverless-stack/resources";

export function Secrets({ stack }: StackContext) {
  const SECRET_KEY = new Config.Secret(stack, "SECRET_KEY");

  return { SECRET_KEY };
}
