import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function notAuth({ req }: { req: NextRequest }) {
  const url = req.nextUrl.clone();
  url.pathname = "/403";
  return NextResponse.redirect(url);
}
