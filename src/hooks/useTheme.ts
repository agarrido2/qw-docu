import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";

const THEME_KEY = "theme-preference";

export function useTheme(defaultTheme: "light" | "dark" = "light") {
  const theme = useSignal<"light" | "dark">(defaultTheme);
  const ready = useSignal(false);

  // Sincroniza con localStorage y sistema operativo
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // 1. Intenta leer la preferencia guardada
    const stored = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;

    // 2. Si hay preferencia guardada, úsala; si no, detecta el sistema
    if (stored === "light" || stored === "dark") {
      theme.value = stored;
    } else {
      theme.value = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    // 3. Escucha cambios del sistema solo si no hay preferencia guardada
    let mq: MediaQueryList | undefined;
    let handler: ((e: MediaQueryListEvent) => void) | undefined;
    if (!stored) {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
      handler = (e: MediaQueryListEvent) => {
        theme.value = e.matches ? "dark" : "light";
      };
      mq.addEventListener("change", handler);
    }

    // 4. Limpieza del listener
    ready.value = true;
    return () => {
      if (mq && handler) mq.removeEventListener("change", handler);
    };
  });

  // Guarda la preferencia cada vez que cambia el tema
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => theme.value);
    localStorage.setItem(THEME_KEY, theme.value);
  });

  // Permite alternar el tema manualmente
  const toggleTheme = $(() => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  });

  return { theme, toggleTheme, ready };
}