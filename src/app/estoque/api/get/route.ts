import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import SessionAuth from "@/app/lib/sessionAuth";

export async function GET() {
  await SessionAuth();

  try {
    const movements = await prisma.stockMovement.findMany({
      include: {
        Product: true,
      },
    });

    return NextResponse.json(movements, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao buscar movimentações." },
      { status: 500 }
    );
  }
}
