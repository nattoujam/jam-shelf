import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth } from "better-auth/plugins";

import { prisma } from "@/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  trustedOrigins: [process.env.CORS_ORIGIN ?? "http://localhost:5173"],
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "pocket-id",
          clientId: process.env.POCKET_ID_CLIENT_ID!,
          clientSecret: process.env.POCKET_ID_CLIENT_SECRET!,
          discoveryUrl: process.env.POCKET_ID_DISCOVERY_URL!,
          scopes: ["openid", "profile", "email"],
        },
      ],
    }),
  ],
});
