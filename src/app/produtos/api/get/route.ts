import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function GET() {
  await SessionAuth();
  try {
    const products = await prisma.product.findMany({
      include: {
        Category: true,
        Supplier: true,
        ProductDetail: true,
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao buscar produtos." },
      { status: 500 }
    );
  }
}
