"use client";
import { Bell, Trash, Search, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { usePathname } from "next/navigation";
//import { useDarkMode } from "../hooks/useDarkMode";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import type { Notification } from "@/app/services/notificationService";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  //const { isDarkMode, toggleDarkMode } = useDarkMode();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const routerPath = usePathname();
  const pathname =
    routerPath.replace("/", "").charAt(0).toUpperCase() + routerPath.slice(2);
  const isForbiddenPage = routerPath === "/403";
  const { data: session } = useSession();
  const clientId = session?.user?.clientId;

  // useSWR com default para array e mutate para atualizar cache local
  const { data: notifications = [], mutate } = useSWR<Notification[]>(
    clientId ? `/api/notifications?clientId=${clientId}` : null,
    fetcher,
    { refreshInterval: 30000 }
  );

  const [open, setOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleSideBarToggle = (open: boolean) => {
    onMenuClick();
    setOpenSideBar(open);
  };

  // remove apenas no front-end (atualiza cache SWR localmente, sem revalidação)
  const handleNotificationRemove = (id: number) => {
    // cria novo array sem o item (NÃO muta o array original)
    const updated = notifications.filter((notification) => notification.id !== id);
    // atualiza cache local do SWR sem revalidar (false = no re-fetch)
    mutate(updated, false);
  };

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
            <button onClick={() => handleSideBarToggle(!openSideBar)}>
              {!openSideBar ? (
                <PanelLeftClose className="w-5 h-5 text-foreground hover:text-primary transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
              ) : (
                <PanelLeftOpen className="w-5 h-5 text-foreground hover:text-primary transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
              )}
            </button>
            <span className="text-lg font-semibold text-center text-foreground hover:bg-border dark:hover:bg-border-dark px-4 py-2 rounded-2xl transition-all hover:translate-x-0.5 ease-linear">
              {pathname}
            </span>
          </div>
          <div className="flex items-center gap-8 w-85 relative">
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
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setOpen((o) => !o)} className="relative">
                <Bell className="w-5 h-5 text-foreground hover:text-primary transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]" />
                {notifications && notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-72 bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">
                  {!notifications ? (
                    <div className="p-4 text-sm text-muted dark:text-muted-dark">Carregando...</div>
                  ) : notifications.length === 0 ? (
                    <div className="p-4 text-sm text-muted dark:text-muted-dark">Nenhuma notificação</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-3 text-sm border-gray-700 border-b last:border-none cursor-pointer hover:bg-muted/20 dark:hover:bg-muted-dark/30 transition-colors"
                        onMouseDown={(e) => e.stopPropagation()} //evita fechar lista apos click
                      >
                        <div className="flex justify-end">
                          <button
                            onMouseDown={(e) => e.stopPropagation()} //evita fechar lista apos click
                            onClick={() => {
                              handleNotificationRemove(n.id);
                            }}
                          >
                           <Trash className="w-4 h-4 text-red-700 hover:text-red-950 transition-all cursor-pointer ease-in hover:-translate-y-[0.1rem]"/>
                          </button>
                        </div>
                        <p className="font-medium text-foreground dark:text-foreground-dark">{`${n.productDescription}`}</p>
                        <p className="text-xs text-muted dark:text-muted-dark">{`${n.message} itens`}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
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
