import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function PUT(request: Request) {
  await SessionAuth();

  try {
    const data = await request.json();
    const { id, supplierInfo, ...supplierData } = data;

    if (!id) {
      return NextResponse.json(
        { message: "ID não fornecido." },
        { status: 400 }
      );
    }

    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: {
        ...supplierData,
        supplierInfo: supplierInfo
          ? { upsert: { create: supplierInfo, update: supplierInfo } }
          : undefined,
      },
      include: { supplierInfo: true },
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
