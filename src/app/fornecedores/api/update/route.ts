import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function PUT(request: Request) {
  await SessionAuth();

  try {
    const { id, name, email, phone, address } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID não fornecido." },
        { status: 400 }
      );
    }

    const updatedSupplier = await prisma.supplier.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    return NextResponse.json(
      { message: "Supplier atualizado com sucesso.", updatedSupplier },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Erro ao atualizar supplier." },
      { status: 500 }
    );
  }
}
