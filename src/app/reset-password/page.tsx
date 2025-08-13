"use client";

import { useState } from "react";
import { Input } from "antd";
import { Toaster, toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/user/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Erro ao atualizar senha.");
      return;
    }
    toast.success("Senha atualizada com sucesso!");
    window.location.href = "/dashboard";
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-sm bg-card dark:bg-card-dark p-6 rounded shadow-md border border-border dark:border-border-dark">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Nova senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-border dark:border-border-dark rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F1592A] !text-white py-2 rounded hover:bg-[#F1592A]/90 transition cursor-pointer"
          >
            Salvar senha
          </button>
        </form>
      </div>
    </main>
  );
}
