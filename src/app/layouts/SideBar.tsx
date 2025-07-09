"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Box,
  ListOrdered,
  LogOut,
  Boxes,
  TruckElectric,
  ShieldCheck,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type SideBarProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideBar({ open, onClose }: SideBarProps) {
  const { data: session, update } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  return (
    <aside
      className={`h-screen transition-all duration-300 ease-out absolute ${open ? "w-64" : "w-16"} bg-card dark:bg-card-dark border-r border-border dark:border-border-dark flex flex-col justify-between py-6 px-2 fixed top-0 z-50`}
    >
      {/* Topo: Logo */}
      <div>
        <div
          className={`mb-8 flex items-center gap-3 px-2 transition-all duration-300 w-full ${!open ? "justify-center" : ""}`}
        >
          {open ? (
            <span className="text-xl font-bold text-primary transition-all duration-300">
              StockPro
            </span>
          ) : (
            <Image src="/logo-icon.png" width={40} height={40} alt="Logo" />
          )}
        </div>
        {/* Menu */}
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-foregroundSec dark:text-foregroundSec-dark hover:bg-primary/10 hover:text-primary transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname === "/dashboard" ? "bg-primary/10 text-primary font-semibold" : ""}`}
          >
            <Home className="w-5 h-5" />
            {open && <span>Dashboard</span>}
          </Link>
          <Link
            href="/produtos"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-foregroundSec dark:text-foregroundSec-dark hover:bg-primary/10 hover:text-primary transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname.startsWith("/produtos") ? "bg-primary/10 text-primary font-semibold" : ""}`}
          >
            <Box className="w-5 h-5" />
            {open && <span>Produtos</span>}
          </Link>
          <Link
            href="/movimentacoes"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-foregroundSec dark:text-foregroundSec-dark hover:bg-primary/10 hover:text-primary transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname.startsWith("/movimentacoes") ? "bg-primary/10 text-primary font-semibold" : ""}`}
          >
            <ListOrdered className="w-5 h-5" />
            {open && <span>Movimentações</span>}
          </Link>
          <Link
            href="/categorias"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-foregroundSec dark:text-foregroundSec-dark hover:bg-primary/10 hover:text-primary transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname.startsWith("/categorias") ? "bg-primary/10 text-primary font-semibold" : ""}`}
          >
            <Boxes className="w-5 h-5" />
            {open && <span>Categorias</span>}
          </Link>
          <Link
            href="/fornecedores"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-foregroundSec dark:text-foregroundSec-dark hover:bg-primary/10 hover:text-primary transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname.startsWith("/fornecedores") ? "bg-primary/10 text-primary font-semibold" : ""}`}
          >
            <TruckElectric className="w-5 h-5" />
            {open && <span>Fornecedores</span>}
          </Link>
          {user?.role === 1 && (
            <Link
              href="/permissoes"
              className={`flex items-center gap-3 py-2 px-3 rounded-lg text-foregroundSec dark:text-foregroundSec-dark hover:bg-primary/10 hover:text-primary transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname.startsWith("/permissoes") ? "bg-primary/10 text-primary font-semibold" : ""}`}
            >
              <ShieldCheck className="w-5 h-5" />
              {open && <span>Permissões</span>}
            </Link>
          )}
        </nav>
      </div>

      {/* Rodapé: Avatar e Logout */}
      <div
        className={`border-t border-border dark:border-border-dark pt-5 mt-10 flex items-center gap-3 transition-all duration-300 ${!open ? "justify-center" : ""}`}
      >
        <Image
          src={"/profile-default.png"}
          width={36}
          height={36}
          alt="Avatar"
          className={`rounded-full border border-border dark:border-border-dark cursor-pointer ${!open ? "" : "ml-4"}`}
        />
        {open && (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground dark:text-foreground-dark cursor-pointer">
              {user?.name}
            </span>
            <button
              className="cursor-pointer flex items-center gap-1 text-xs dark:text-white text-danger hover:underline"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="w-4 h-4" />
              <span className="hover:text-orange-500">Sair</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
