import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Resend } from "resend";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

export async function POST(request: Request) {
  console.log("request", request);
  console.log("authOptions", authOptions);
  console.log("Iniciando criação de usuário...");
  const session = await getServerSession(authOptions);
  console.log("session:", session);
  if (!session || session.user.role !== 1) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
  }

  try {
    const { name, email, role, clientId } = await request.json();
    console.log(name, email, role, clientId);
    console.log("Dados recebidos do formulário:", {
      name,
      email,
      role,
      clientId,
    });
    if (!name || !email || typeof role !== "number") {
      return NextResponse.json(
        { message: "Dados inválidos." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "E-mail já cadastrado." },
        { status: 400 }
      );
    }

    console.log("Gerando senha temporária e criptografando...");
    const tempPassword = crypto
      .randomBytes(8)
      .toString("base64url")
      .slice(0, 12);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password: hashedPassword,
        clientId,
      },
    });
    console.log("Usuário criado com sucesso no banco:", user);

    try {
      console.log("Enviando e-mail de boas-vindas para:", email);
      await resend.emails.send({
        from: "no-reply@onresend.com",
        to: email,
        subject: "Bem-vindo ao StockPro!",
        html: `
          <h1>Conta criada com sucesso</h1>
          <p>Seu acesso ao StockPro está pronto. Aqui estão suas credenciais:</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Senha temporária:</strong> ${tempPassword}</p>
          <p>Faça login e altere sua senha imediatamente.</p>
        `,
      });
    } catch (emailError) {
      console.error("Erro ao enviar o e-mail:", emailError);
      return NextResponse.json(
        { message: "Usuário criado, mas não foi possível enviar o e-mail." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro inesperado durante criação de usuário:", error);
    return NextResponse.json(
      { message: "Erro ao criar usuário." },
      { status: 500 }
    );
  }
}
