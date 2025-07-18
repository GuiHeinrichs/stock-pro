import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: number | null;
    };
  }

  interface User {
    role?: number | null;
  }

  interface JWT {
    role?: number | null;
  }
}
