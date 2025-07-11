"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "antd";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "sonner";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/dashboard",
        email,
        password,
      });

      if (result?.error) {
        toast.error("Usuário ou senha incorretos.");
      } else {
        window.location.href = result?.url || "/dashboard";
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao fazer login. Por favor, tente novamente.");
      console.error("Login error:", error);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <Toaster richColors position="top-right" offset={{ right: "6rem" }} />
      <div className="grid grid-cols-5 w-full h-screen">
        <div className="col-span-3 bg-card dark:bg-card-dark flex items-center justify-center p-8 border-r border-border dark:border-border-dark">
          <p className="text-foreground dark:text-foreground-dark text-2xl">
            Video Placeholder
          </p>
        </div>
        <div className="col-span-2 bg-card dark:bg-card-dark relative flex flex-col items-center justify-center px-8 gap-y-4 border-l border-border dark:border-border-dark">
          <div className="flex flex-col items-start max-w-sm w-full text-3xl font-normal z-0 gap-y-1">
            <span className="text-foregroundSec dark:text-foregroundSec-dark">
              A evolução da gestão
            </span>
            <span className="text-foregroundSec dark:text-foregroundSec-dark">
              começa com
            </span>
            <div className="flex items-center">
              <span className="text-[#F1592A] font-semibold animate-slide-in-item">
                StockPro{" "}
                <span role="img" aria-label="Caixa">
                  📦
                </span>
              </span>
            </div>
          </div>
          <div className="w-full max-w-sm bg-card dark:bg-card-dark p-6 rounded-md shadow-sm border border-border dark:border-border-dark z-50">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foregroundSec dark:text-foregroundSec-dark mb-1"
                >
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 border border-border dark:border-border-dark rounded focus:outline-none focus:ring-2 focus:ring-primary text-foreground dark:text-foreground-dark bg-background dark:bg-background-dark"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foregroundSec dark:text-foregroundSec-dark mb-1"
                >
                  Senha
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-border dark:border-border-dark rounded focus:outline-none focus:ring-2 focus:ring-primary text-foreground dark:text-foreground-dark bg-background dark:bg-background-dark"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#F1592A] !text-white py-2 rounded hover:bg-[#F1592A]/90 transition cursor-pointer"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
