import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { name, image } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, image },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao atualizar perfil." },
      { status: 500 }
    );
  }
}
