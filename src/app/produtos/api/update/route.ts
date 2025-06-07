import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function PUT(request: Request) {
  await SessionAuth();
  try {
    const {
      id,
      name,
      description,
      price,
      sellingPrice,
      quantity,
      sku,
      barcode,
      categoryId,
      supplierId,
      createdAt,
      updatedAt,
      ProductDetail,
    } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID não fornecido." },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name,
        price,
        sellingPrice,
        quantity,
        sku,
        barcode,
        description,
        categoryId,
        supplierId,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
        ProductDetail: {
          update: {
            where: { id: ProductDetail?.id },
            data: {
              brand: ProductDetail?.brand,
              model: ProductDetail?.model,
              dimensions: ProductDetail?.dimensions,
              weight: ProductDetail?.weight,
              color: ProductDetail?.color,
              material: ProductDetail?.material,
              additionalInfo: ProductDetail?.additionalInfo,
            },
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Produto atualizado com sucesso.", updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Erro ao atualizar produto." },
      { status: 500 }
    );
  }
}
