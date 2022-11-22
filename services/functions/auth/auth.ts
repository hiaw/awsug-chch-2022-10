import {
  AuthHandler,
  GoogleAdapter,
  Session,
} from "@serverless-stack/node/auth";
import { Config } from "@serverless-stack/node/config";

declare module "@serverless-stack/node/auth" {
  export interface SessionTypes {
    user: {
      sub: string;
      email: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: Config.GOOGLE_CLIENT_ID,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();

        return Session.parameter({
          redirect: "https://example.com",
          type: "user",
          properties: {
            sub: claims.sub,
            email: claims.email || "",
          },
        });
      },
    }),
  },
});
