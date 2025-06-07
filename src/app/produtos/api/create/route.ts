import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function POST(request: Request) {
  await SessionAuth();

  try {
    const data = await request.json();
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        sellingPrice: data.sellingPrice,
        sku: data.sku,
        barcode: data.barcode,
        quantity: data.quantity,
        categoryId: data.categoryId,
        supplierId: data.supplierId,
        ProductDetail: {
          create: data.ProductDetail,
        },
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao criar produto." },
      { status: 500 }
    );
  }
}
