import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: number | null;
      clientId?: number | null;
    };
  }

  interface User {
    role?: number | null;
    clientId?: number | null;
  }

  interface JWT {
    role?: number | null;
    clientId?: number | null;
  }
}
