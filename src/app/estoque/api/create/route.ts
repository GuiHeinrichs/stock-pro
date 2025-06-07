import { StockMovementService } from "@/app/services/stockMovementService";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function POST(request: Request) {
  await SessionAuth();
  try {
    const { productId, type, quantity } = await request.json();

    if (!productId || !type || !quantity) {
      return NextResponse.json(
        { message: "Dados incompletos." },
        { status: 400 }
      );
    }

    const data = request.json();
    const movement = await StockMovementService.create(data);

    return NextResponse.json(movement, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao criar movimentação." },
      { status: 500 }
    );
  }
}
