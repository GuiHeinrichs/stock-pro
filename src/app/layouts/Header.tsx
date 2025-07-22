"use client";
import Image from "next/image";
import { Bell, Search, Sun, PanelLeft, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDarkMode } from "../hooks/useDarkMode";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  const routerPath = usePathname();
  const pathname =
    routerPath.replace("/", "").charAt(0).toUpperCase() + routerPath.slice(2);
  const isForbiddenPage = routerPath === "/403";
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header
      className={`w-full ${isForbiddenPage ? "" : "pl-22"} h-16 bg-card dark:bg-card-dark border-b border-border dark:border-border-dark flex items-center justify-between px-6 shadow-sm z-10 sticky top-0`}
    >
      {isForbiddenPage ? (
        <div className="flex justify-center items-center w-full text-2xl font-bold text-primary">
          StockPro
        </div>
      ) : (
        <>
          <div className="flex justify-start items-center gap-8 text-sm">
            <button onClick={onMenuClick}>
              <PanelLeft className="w-5 h-5 text-foreground hover:text-primary transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
            </button>
            <span className="text-lg font-semibold text-center text-foreground hover:bg-border dark:hover:bg-border-dark px-4 py-2 rounded-2xl transition-all hover:translate-x-0.5 ease-linear">
              {pathname}
            </span>
          </div>
          <div className="flex items-center gap-8 w-85">
            <div className="flex items-center bg-muted/20 dark:bg-muted/40 px-3 py-1.5 rounded-full w-full text-muted dark:text-muted-dark hover:bg-muted/30 dark:hover:bg-muted-dark/30 cursor-pointer">
              <Search className="w-4 h-4 mr-2 transition-transform ease-in hover:-translate-y-[0.1rem]" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent w-full outline-none text-sm placeholder-muted dark:placeholder-muted-dark text-foreground dark:text-foreground-dark cursor-pointer transition-transform ease-in hover:-translate-y-[0.1rem]"
              />
              <kbd className="ml-2 text-xs text-muted dark:text-muted-dark bg-muted/20 dark:bg-muted-dark/20 px-1.5 py-0.5 rounded">
                /
              </kbd>
            </div>
            <button>
              <Bell className="w-5 h-5 text-foreground hover:text-primary transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
            </button>
            {/* <button onClick={toggleDarkMode}>
              {true ? (
                <Sun className="w-5 h-5 text-foregroundSec dark:text-foregroundSec-dark hover:text-primary transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
              ) : (
                <Moon className="w-5 h-5 text-foregroundSec dark:text-foregroundSec-dark hover:text-primary transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
              )}
            </button> */}
          </div>
        </>
      )}
    </header>
  );
}
