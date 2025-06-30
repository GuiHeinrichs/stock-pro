import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
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

        // const isValid = await bcrypt.compare(
        //   credentials.password,
        //   user.password
        // );

        // if (!isValid) return null;

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? null,
          role: Number(user.role),
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
        token.image = user.image ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role !== undefined) session.user.role = token.role as number;
      if (token?.image !== undefined) session.user.image = token.image as string | null;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
