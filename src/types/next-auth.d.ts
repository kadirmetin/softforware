import type NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
    } & DefaultSession["user"];
  }
}

export default NextAuth;
