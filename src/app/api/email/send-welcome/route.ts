import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { to, password } = body;

  try {
    const data = await resend.emails.send({
      from: "no-reply@onresend.com",
      to,
      subject: "Bem-vindo ao StockPro!",
      html: `
        <h1>Conta criada com sucesso</h1>
        <p>Seu acesso ao StockPro está pronto. Aqui estão suas credenciais:</p>
        <p><strong>E-mail:</strong> ${to}</p>
        <p><strong>Senha:</strong> ${password}</p>
        <p>Você deve alterá-la após o login.</p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao enviar e-mail." },
      { status: 500 }
    );
  }
}
