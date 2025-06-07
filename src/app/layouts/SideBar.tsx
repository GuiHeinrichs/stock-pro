"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Box, ListOrdered, LogOut, Boxes } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type SideBarProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideBar({ open, onClose }: SideBarProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen transition-all duration-300 ease-out absolute ${open ? "w-64" : "w-16"} bg-white border-r border-[#E0E0E0] flex flex-col justify-between py-6 px-2 fixed top-0 z-50`}
    >
      {/* Topo: Logo */}
      <div>
        <div
          className={`mb-8 flex items-center gap-3 px-2 transition-all duration-300 w-full ${!open ? "justify-center" : ""}`}
        >
          {open ? (
            <span className="text-xl font-bold text-[#F1592A] transition-all duration-300">
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
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-[#666] hover:bg-[#F1592A]/10 hover:text-[#F1592A] transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname === "/dashboard" ? "bg-[#F1592A]/10 text-[#F1592A] font-semibold" : ""}`}
          >
            <Home className="w-5 h-5" />
            {open && <span>Dashboard</span>}
          </Link>
          <Link
            href="/produtos"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-[#666] hover:bg-[#F1592A]/10 hover:text-[#F1592A] transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname.startsWith("/produtos") ? "bg-[#F1592A]/10 text-[#F1592A] font-semibold" : ""}`}
          >
            <Box className="w-5 h-5" />
            {open && <span>Produtos</span>}
          </Link>
          <Link
            href="/movimentacoes"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-[#666] hover:bg-[#F1592A]/10 hover:text-[#F1592A] transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname.startsWith("/movimentacoes") ? "bg-[#F1592A]/10 text-[#F1592A] font-semibold" : ""}`}
          >
            <ListOrdered className="w-5 h-5" />
            {open && <span>Movimentações</span>}
          </Link>
          <Link
            href="/categorias"
            className={`flex items-center gap-3 py-2 px-3 rounded-lg text-[#666] hover:bg-[#F1592A]/10 hover:text-[#F1592A] transition-all cursor-pointer ease-in hover:translate-x-[0.1rem] ${!open ? "justify-center" : ""} ${pathname.startsWith("/categorias") ? "bg-[#F1592A]/10 text-[#F1592A] font-semibold" : ""}`}
          >
            <Boxes className="w-5 h-5" />
            {open && <span>Categorias</span>}
          </Link>
        </nav>
      </div>

      {/* Rodapé: Avatar e Logout */}
      <div
        className={`border-t border-[#E0E0E0] pt-5 mt-10 flex items-center gap-3 transition-all duration-300 ${!open ? "justify-center" : ""}`}
      >
        <Image
          src={user?.image || "/profile-default.png"}
          width={36}
          height={36}
          alt="Avatar"
          className="rounded-full border border-[#E0E0E0]"
        />
        {open && (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#1F1F1F]">
              {user?.name || "Admin"}
            </span>
            <button
              className="cursor-pointer flex items-center gap-1 text-xs text-[#F44336] hover:underline"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
