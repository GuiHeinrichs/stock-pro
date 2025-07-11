import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const protectedApiRoutes = ["/produtos/api", "/estoque/api"];
  const isProtectedApi = protectedApiRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedApi && !token) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const publicRoutes = ["/login", "/403"];
  const isPublic = publicRoutes.some((path) => pathname.startsWith(path));

  if (!token && !isPublic && !isProtectedApi) {
    const url = req.nextUrl.clone();
    url.pathname = "/403";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/produtos/api/:path*",
    "/estoque/api/:path*",
  ],
};
