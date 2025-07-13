"use client";
import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    const syncTheme = (e: StorageEvent) => {
      if (e.key === "theme") {
        setIsDarkMode(e.newValue === "dark");
      }
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((v) => !v);

  return { isDarkMode, toggleDarkMode };
};
