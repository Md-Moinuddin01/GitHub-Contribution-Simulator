import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { demoUsers } from "@/lib/demo-data";
import { tryDb } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email or username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const identifier = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";
        if (!identifier) return null;

        const dbUser = await tryDb(
          (db) =>
            db.user.findFirst({
              where: { OR: [{ email: identifier }, { username: identifier }] },
            }),
          null,
        );

        if (dbUser?.passwordHash) {
          const valid = await bcrypt.compare(password, dbUser.passwordHash);
          if (!valid) return null;
          return {
            id: dbUser.id,
            name: dbUser.name ?? dbUser.username,
            email: dbUser.email,
            image: dbUser.avatar ?? dbUser.image,
          };
        }

        const demo = demoUsers.find((user) => user.email === identifier || user.username === identifier);
        if (demo && (password === "password" || password === "demo123")) {
          return { id: demo.id, name: demo.name, email: demo.email, image: demo.avatar };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
