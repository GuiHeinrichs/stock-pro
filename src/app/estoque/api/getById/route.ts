import { StockMovementService } from "@/app/services/stockMovementService";
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

    const stock = await StockMovementService.findById(Number(id));

    if (!stock) {
      return NextResponse.json(
        { message: "Stock não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(stock, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao buscar stock com o ID informado." },
      { status: 500 }
    );
  }
}
