import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 1) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
    }

    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true },
            orderBy: { id: "asc" },
        });
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Erro ao buscar usuários." },
            { status: 500 }
        );
    }
}