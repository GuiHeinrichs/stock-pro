import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function DELETE(request: Request) {
  await SessionAuth();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID não fornecido." },
        { status: 400 }
      );
    }

    const supplier = await prisma.supplier.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { message: "Supplier removido com sucesso!", supplier },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao deletar supplier." },
      { status: 500 }
    );
  }
}
