import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { createGuest, getGuest } from "./data-service";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await getGuest(email);

        if (!user || !user.password) return null;

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) throw new Error("Wrong password");

        return user;
      },
    }),
  ],

  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    async signIn({ user, account }) {
      // Don't create an account if login is from crendetials
      if (account.type === "credentials") return true;

      // if user already exists don't create
      const existingUser = await getGuest(user.email);
      if (existingUser) return true;

      createGuest({
        fullName: user.name,
        email: user.email,
        ...(user.image && { image: user.image }),
      });

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.id = token.userId;
        session.user.image = token.image;
      }

      return session;
    },

    async jwt({ token }) {
      const existingUser = await getGuest(token.email);
      if (existingUser) {
        token.name = existingUser.fullName;
        token.userId = existingUser.id;
        token.image = existingUser.image;
      }

      return token;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
