import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";


export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    jwt({ token }) {
      return Promise.resolve(token);
    },
    session({session,token}){
      if(session.user && token.sub){
        session.user.id = token.sub
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },


  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,

    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    })
    // ...add more providers here
  ],
  secret: env.NEXTAUTH_SECRET,


};

export default NextAuth(authOptions);
