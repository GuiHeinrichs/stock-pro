import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";

export async function POST(request: Request) {
  await SessionAuth();

  try {
    const data = await request.json();
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.clientId) {
      return NextResponse.json(
        { message: "Sessão inválida ou cliente não identificado." },
        { status: 401 }
      );
    }

    const clientId = Number(session.user.clientId);
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
        clientId,
        ProductDetail: {
          create: data.ProductDetail
            ? {
                ...data.ProductDetail,
                clientId,
              }
            : undefined,
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
