import Link from 'next/link';

export const metadata = {
  title: '403 - Acesso Negado',
};

export default function ForbiddenPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-background text-foreground animate-slide-in-item">
      <h1 className="text-6xl font-bold text-primary mb-4">403</h1>
      <p className="text-xl mb-6">Você não tem acesso a esta página.</p>
      <Link href="/login" className="text-info hover:underline">
        Voltar para o login
      </Link>
    </main>
  );
}
