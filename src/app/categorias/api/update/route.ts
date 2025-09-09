import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function PUT(request: Request) {
  await SessionAuth();
  try {
    const { id, title } = await request.json();
    if (!id) {
      return NextResponse.json(
        { message: "ID não fornecido." },
        { status: 400 }
      );
    }

    await prisma.category.update({
      where: { id },
      data: { title },
    });

    return NextResponse.json({ message: "Categoria atualizada com sucesso." }, { status: 200 });
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : "Erro ao atualizar categoria.");
    return NextResponse.json(
      { message: "Erro ao atualizar categoria." },
      { status: 500 }
    );
  }
}
