import { ProductService } from "@/app/services/productService";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function GET(request: Request) {
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

    const product = await ProductService.findById(Number(id));

    if (!product) {
      return NextResponse.json(
        { message: "Produto não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao buscar produto com o ID informado." },
      { status: 500 }
    );
  }
}
