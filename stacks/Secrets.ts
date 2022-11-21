import { Config, StackContext } from "@serverless-stack/resources";

export function Secrets({ stack }: StackContext) {
  const SECRET_KEY = new Config.Secret(stack, "SECRET_KEY");
  const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID");

  return { SECRET_KEY, GOOGLE_CLIENT_ID };
}
