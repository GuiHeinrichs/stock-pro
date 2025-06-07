import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function PUT(request: Request) {
  await SessionAuth();

  try {
    const { id, type, quantity } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID não fornecido." },
        { status: 400 }
      );
    }

    const updatedMovement = await prisma.stockMovement.update({
      where: {
        id: parseInt(id),
      },
      data: {
        type,
        quantity,
      },
    });

    return NextResponse.json(updatedMovement, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao atualizar movimentação." },
      { status: 500 }
    );
  }
}
