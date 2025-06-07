import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function GET() {
  await SessionAuth();

  try {
    const suppliers = await prisma.supplier.findMany({
      include: { supplierInfo: true, products: true },
    });

    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao tentar buscar os suppliers." },
      { status: 500 }
    );
  }
}
