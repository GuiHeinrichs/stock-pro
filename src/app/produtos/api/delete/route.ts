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

    await prisma.productDetail.deleteMany({
      where: {
        productId: parseInt(id),
      },
    });

    const product = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(
      { message: "Produto removido com sucesso!", product },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao deletar produto." },
      { status: 500 }
    );
  }
}
