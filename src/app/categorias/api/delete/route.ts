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
    await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { message: "Categoria removida com sucesso." },
      { status: 204 }
    );
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : "Erro ao deletar categoria.");
    return NextResponse.json(
      { message: "Erro ao deletar categoria." },
      { status: 500 }
    );
  }
}
