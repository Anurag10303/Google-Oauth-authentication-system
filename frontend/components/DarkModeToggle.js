"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  // Always start false — the inline <script> in RootLayout already set the
  // correct class on <html> before React hydrates, so we just read that.
  const [dark, setDark] = useState(false);

  // On mount: read the class the inline script applied. Don't touch the class
  // here — just sync React state to whatever the DOM already shows.
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="
        relative flex items-center justify-center
        w-10 h-10 rounded-full
        bg-white dark:bg-stone-800
        border border-stone-200 dark:border-stone-700
        shadow-sm hover:shadow-md
        text-stone-500 dark:text-amber-300
        hover:text-amber-500 dark:hover:text-amber-200
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
      "
    >
      <span className="text-base leading-none select-none transition-transform duration-300">
        {dark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
