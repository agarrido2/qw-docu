import { component$ } from "@builder.io/qwik";

export const FinalCTA = component$(() => (
  <section id="demo" class="bg-blue-600 text-white py-20 px-6 text-center relative overflow-hidden">
    <h2 class="text-3xl font-bold mb-4">Digitaliza tu empresa hoy mismo</h2>
    <p class="mb-8 text-lg">Elimina el papel. Activa el control inteligente de documentos con IA.</p>
    <a
      href="#"
      class="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl shadow hover:bg-gray-100 transition text-xl animate-pulse"
      aria-label="Probar gratis"
    >
      Probar gratis
    </a>
  </section>
));
