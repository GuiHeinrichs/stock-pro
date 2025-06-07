"use client";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
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
        callbackUrl: "/",
        email,
        password,
      });

      if (!result?.error) {
        window.location.href = result?.url || "/";
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao fazer login: " + error);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <Toaster richColors position="top-right" />
      <div className="grid grid-cols-5 w-full h-screen">
        <div className="col-span-3 bg-[#FFFFFF] flex items-center justify-center p-8">
          <p className="text-[#1F1F1F] text-2xl">Video Placeholder</p>
        </div>
        <div className="col-span-2 bg-[#FFFFFF] relative flex flex-col items-center justify-center px-8 gap-y-4 border-l border-[#E0E0E0]">
          <div className="flex flex-col items-start max-w-sm w-full text-3xl font-normal z-0 gap-y-1">
            <span className="text-[#666666]">A evolução da gestão</span>
            <span className="text-[#666666]">começa com</span>
            <div className="flex items-center">
              <span className="text-[#F1592A] font-semibold animate-slide-in-item">
                StockPro{" "}
                <span role="img" aria-label="Caixa">
                  📦
                </span>
              </span>
            </div>
          </div>
          <div className="w-full max-w-sm bg-card p-6 rounded-md shadow-sm border border-[#E0E0E0] z-50">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#666666] mb-1"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-2 focus:ring-primary text-[#1F1F1F]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#666666] mb-1"
                >
                  Senha
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={showPassword ? "" : "••••••••"}
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:ring-2 focus:ring-primary text-[#1F1F1F] pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-[2.7rem] right-3 flex items-center justify-center text-gray-500 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
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
