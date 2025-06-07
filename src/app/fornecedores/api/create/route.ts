import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function POST(request: Request) {
  await SessionAuth();

  try {
    const data = await request.json();
    const { supplierInfo, ...supplierData } = data;
    const supplier = await prisma.supplier.create({
      data: {
        ...supplierData,
        supplierInfo: supplierInfo
          ? { create: supplierInfo }
          : undefined,
      },
      include: { supplierInfo: true },
    });

    return NextResponse.json(
      { message: "Supplier criado com sucesso!", supplier },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao criar supplier." },
      { status: 500 }
    );
  }
}
