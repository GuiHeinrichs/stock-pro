import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 1) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
    }

    try {
        const { id, role } = await request.json();
        if (typeof id !== "number" || typeof role !== "number") {
            return NextResponse.json(
                { message: "Dados inválidos." },
                { status: 400 }
            );
        }

        await prisma.user.update({ where: { id }, data: { role } });
        return NextResponse.json({ message: "Papel atualizado." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Erro ao atualizar papel." },
            { status: 500 }
        );
    }
}