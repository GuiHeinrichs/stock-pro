import Link from "next/link";
import { Result, Button } from "antd";

export const metadata = {
  title: "403 - Acesso Negado",
};

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-full items-center justify-center bg-background">
      <Result
        status="403"
        title="403"
        subTitle="Você não tem acesso a esta página."
        extra={
          <Link href="/login">
            <Button type="primary">Voltar para o login</Button>
          </Link>
        }
        className="text-center"
      />
    </div>
  );
}
