import { prisma } from "@/app/lib/prisma";
import { HashPass } from "@/app/lib/hashPass";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { resetPassword: true },
  });

  return NextResponse.json({ resetPassword: user?.resetPassword ?? false });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { password } = await request.json();
  if (!password) {
    return NextResponse.json({ message: "Senha é obrigatória" }, { status: 400 });
  }

  const hashedPassword = await HashPass({ password });

  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashedPassword, resetPassword: false },
  });

  return NextResponse.json({ message: "Senha atualizada com sucesso" });
}
