"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Применяем темную тему и настройки
  useEffect(() => {
    // Применяем класс к html элементу для темной темы
    document.documentElement.classList.add('dark');
    document.body.className = "antialiased bg-background text-foreground overflow-x-hidden";
  }, []);

  return <div className="antialiased min-h-screen bg-background text-foreground">{children}</div>;
}
