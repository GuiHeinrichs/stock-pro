// src/app/layouts/ClientLayout.tsx  (CLIENT)
"use client";
import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useDarkMode } from "../hooks/useDarkMode";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode } = useDarkMode();
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isForbiddenPage = pathname === "/403";


  return (
    <div className="flex min-h-screen bg-background dark:bg-background-dark">
      <ConfigProvider
        theme={{
          algorithm: isDarkMode
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        }}
      >
        <SessionProvider>
          {!isLoginPage && !isForbiddenPage && (
            <SideBar
              open={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          )}
        <div
          className={`flex-1 min-w-0 transition-all duration-300 ${
            !isLoginPage && !isForbiddenPage && isSidebarOpen ? "ml-52" : "ml-0"
          }`}
        >
          {!isLoginPage && (
            <Header
              onMenuClick={() => setIsSidebarOpen((v) => !v)}
            />
          )}
          <main>{children}</main>
        </div>
        </SessionProvider>
      </ConfigProvider>
    </div>
  );
}
