// src/app/layouts/ClientLayout.tsx  (CLIENT)
"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import ThemeToggle from "../components/ThemeToggle";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  useEffect(() => {}, []);

  return (
    <div className="flex min-h-screen bg-background dark:bg-background-dark">
      <SessionProvider>
        {!isLoginPage && (
          <SideBar
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
        <div
          className={`flex-1 min-w-0 transition-all duration-300 ${
            !isLoginPage && isSidebarOpen ? "ml-52" : "ml-0"
          }`}
        >
          {!isLoginPage && (
            <Header onMenuClick={() => setIsSidebarOpen((v) => !v)} />
          )}
          <main>{children}</main>
        </div>
      </SessionProvider>
    </div>
  );
}
