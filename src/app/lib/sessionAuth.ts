import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export default async function SessionAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Acesso não autorizado" },
      { status: 401 }
    );
  }
}
