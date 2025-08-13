import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import { Resend } from "resend";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const roleTitles: Record<number, string> = {
  0: "Operador",
  1: "Administrador",
  2: "Gerente",
};

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function POST(request: Request) {
  console.log("Iniciando criação de usuário...");
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 1) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 403 });
  }

  try {
    const { name, email, role, clientId } = await request.json();
    if (!name || !email || typeof role !== "number" || !clientId) {
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

    await prisma.role.upsert({
      where: { id: role },
      update: {},
      create: { id: role, title: roleTitles[role] || `Role ${role}` },
    });

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
        resetPassword: true,
        clientId,
      },
    });
    console.log("Usuário criado com sucesso no banco:", user);

    let emailSent = true;
    try {
      await resend.emails.send({
        from: "StockPro <onboarding@resend.dev>",
        to: email,
        subject: "Bem-vindo ao StockPro!",
        html: `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>Bem-vindo ao StockPro!</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #ffffff;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 32px;
          background-color: #ffffff;
          border: 1px solid #eeeeee;
          border-radius: 8px;
        }
        .header {
          text-align: center;
          margin-bottom: 24px;
        }
        .logo {
          width: 120px;
          margin-bottom: 12px;
        }
        .title {
          font-size: 24px;
          color: #f1592a;
          margin: 0;
        }
        .content {
          font-size: 16px;
          line-height: 1.6;
          margin-top: 24px;
        }
        .credentials {
          background-color: #f7f7f7;
          padding: 16px;
          border-radius: 6px;
          margin: 16px 0;
        }
        .credentials p {
          margin: 4px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #f1592a;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          margin-top: 24px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #999999;
          margin-top: 40px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div style="font-size: 32px; color: #f1592a;">📦 <strong>StockPro</strong></div>
        </div>
        <div class="content">
          <p>Olá <strong>${name}</strong>,</p>
          <p>Seja muito bem-vindo ao sistema <strong>StockPro</strong>, a solução ideal para o controle do seu estoque.</p>
          <div class="credentials">
            <p><strong>Login:</strong> ${email}</p>
            <p><strong>Senha temporária:</strong> ${tempPassword}</p>
          </div>
          <p style="color: black;">Para acessar sua conta, clique no botão abaixo:</p>
          <div style="text-align: center;">
            <a class="button" href="http://localhost:3000/login" target="_blank">Acessar o StockPro</a>
          </div>
        </div>
        <div class="footer">
          © 2025 StockPro — Todos os direitos reservados.
        </div>
      </div>
    </body>
  </html>
        `,
      });
    } catch (emailError) {
      console.error("Erro ao enviar o e-mail:", emailError);
      emailSent = false;
    }

    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailSent,
      },
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
