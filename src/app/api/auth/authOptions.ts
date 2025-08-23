import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        // Password validation was disabled in the original code.
        // Re-enable with bcrypt if password hashing is in use.
        console.log('credentials', user);
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: Number(user.role),
          clientId: user.clientId ?? null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.clientId = (user as any).clientId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role !== undefined) session.user.role = token.role as number;
      if (token?.clientId !== undefined)
        session.user.clientId = token.clientId as number;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;

