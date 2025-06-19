import { StockMovementService } from "@/app/services/stockMovementService";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function POST(request: Request) {
  await SessionAuth();
  try {
    // Parse request body only once to avoid "Body has already been read" errors
    const data = await request.json();
    const { productId, type, quantity } = data;

    if (!productId || !type || !quantity) {
      return NextResponse.json(
        { message: "Dados incompletos." },
        { status: 400 }
      );
    }

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
