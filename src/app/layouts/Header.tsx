"use client";
import { useState } from "react";
import { Bell, Search, Sun, PanelLeft, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDarkMode } from "../hooks/useDarkMode";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname =
    usePathname().replace("/", "").charAt(0).toUpperCase() +
    usePathname().slice(2);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="w-full pl-22 h-16 bg-white border-b border-[#E0E0E0] flex items-center justify-between px-6 shadow-sm z-10 sticky top-0">
      {/* Search bar */}
      <div className="flex justify-start items-center gap-8 text-sm text-[#666]">
        <button onClick={onMenuClick}>
          <PanelLeft className="w-5 h-5 text-[#666] hover:text-[#F1592A] transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
        </button>
        <span className="text-lg font-semibold text-center text-[#666] hover:bg-[#E0E0E0] px-4 py-2 rounded-2xl transition-all hover:translate-x-0.5 ease-linear">
          {pathname}
        </span>
      </div>
      <div className="flex items-center gap-8 w-85">
        <div className="flex items-center bg-[#f5f5f5] px-3 py-1.5 rounded-full w-full text-[#999] hover:bg-[#e4e4e4] cursor-pointer">
          <Search className="w-4 h-4 mr-2 transition-transform ease-in hover:-translate-y-[0.1rem]" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full outline-none text-sm placeholder-[#999] text-[#333] cursor-pointer transition-transform ease-in hover:-translate-y-[0.1rem]"
          />
          <kbd className="ml-2 text-xs text-[#bbb] bg-[#eaeaea8a] px-1.5 py-0.5 rounded">
            /
          </kbd>
        </div>
        <button>
          <Bell className="w-5 h-5 text-[#666] hover:text-[#F1592A] transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
        </button>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-[#666] hover:text-[#F1592A] transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
          ) : (
            <Moon className="w-5 h-5 text-[#666] hover:text-[#F1592A] transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
          )}
        </button>
      </div>
      {/* Notifications */}
    </header>
  );
}
