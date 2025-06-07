import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function DELETE(request: Request) {
  await SessionAuth();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID não fornecido." }, { status: 400 });
  }

  try {
    await prisma.stockMovement.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { message: "Movimentação removida com sucesso." },
      { status: 204 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao deletar movimentação." },
      { status: 500 }
    );
  }
}
