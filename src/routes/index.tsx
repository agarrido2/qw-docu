import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const head: DocumentHead = {
  title: "Okios - Transforma tu gestión documental con IA y automatización",
  meta: [
    {
      name: "description",
      content:
        "Okios convierte tus documentos en procesos inteligentes, seguros y sin esfuerzo. Descubre la nueva era de la eficiencia empresarial.",
    },
    {
      name: "keywords",
      content: "gestión documental, IA, automatización, eficiencia empresarial",
    },
    {
      property: "og:title",
      content:
        "Okios - Transforma tu gestión documental con IA y automatización",
    },
    {
      property: "og:description",
      content:
        "Okios convierte tus documentos en procesos inteligentes, seguros y sin esfuerzo. Descubre la nueva era de la eficiencia empresarial.",
    },
    {
      property: "og:image",
      content: "https://example.com/og-image.jpg",
    },
    {
      property: "og:url",
      content: "https://example.com",
    },
    {
      property: "og:site_name",
      content: "Okios",
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:title",
      content:
        "Okios - Transforma tu gestión documental con IA y automatización",
    },
    {
      property: "twitter:description",
      content:
        "Okios convierte tus documentos en procesos inteligentes, seguros y sin esfuerzo. Descubre la nueva era de la eficiencia empresarial.",
    },
    {
      property: "twitter:image",
      content: "https://example.com/twitter-image.jpg",
    },
  ],
  links: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
    {
      rel: "canonical",
      href: "https://example.com",
    },
  ],
};

import { Hero } from "../components/layout/partials/Hero";
import { Benefits } from "../components/layout/partials/Benefits";
import { ProcessSteps } from "../components/layout/partials/ProcessSteps";
import { AISection } from "../components/layout/partials/AISection";
import { FinalCTA } from "../components/layout/partials/FinalCTA";

export default component$(() => {
  return (
    <main class="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 font-sans text-gray-100">
      {/* Fondo decorativo con desenfoque (igual que auth) */}
      <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div class="absolute top-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-blue-900 opacity-40 blur-3xl"></div>
        <div class="absolute right-[-80px] bottom-[-80px] h-[220px] w-[220px] rounded-full bg-blue-700 opacity-30 blur-2xl"></div>
        <div class="absolute top-1/2 left-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 opacity-20 blur-xl"></div>
      </div>
      <Hero />
      <Benefits />
      <ProcessSteps />
      <AISection />
      <FinalCTA />
    </main>
  );
});
