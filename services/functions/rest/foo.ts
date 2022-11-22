import { ApiHandler } from "@serverless-stack/node/api";
import { useSession } from "@serverless-stack/node/auth";

export const needsAuthHandler = ApiHandler(async (event) => {
  const session = useSession();

  const properities = session.properties as any;
  const sub = properities.sub || "";

  return {
    statusCode: 200,
    body: { sub, email: properities.email },
  };
});
