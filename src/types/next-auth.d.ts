import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: number | null;
      clientId?: number | null;
    };
  }

  interface User {
    id: string;
    role?: number | null;
    clientId?: number | null;
  }

  interface JWT {
    id: string;
    role?: number | null;
    clientId?: number | null;
  }
}
