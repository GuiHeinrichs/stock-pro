import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const clients = await prisma.client.findMany();
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao buscar clientes." },
      { status: 500 }
    );
  }
}
