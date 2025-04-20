import { component$ } from "@builder.io/qwik";

export const Benefits = component$(() => (
  <section id="beneficios" class="bg-gray-900 py-20 px-6">
    <h2 class="text-3xl font-bold mb-10 text-center text-blue-400">Beneficios principales</h2>
    <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
      <div class="p-6 rounded-xl bg-gray-800 shadow-md hover:shadow-lg transition">
        <h3 class="text-xl font-bold mb-2 text-blue-300">Digitalización Total</h3>
        <p class="text-gray-300">Desde facturas hasta emails, todo en digital y accesible.</p>
      </div>
      <div class="p-6 rounded-xl bg-gray-800 shadow-md hover:shadow-lg transition">
        <h3 class="text-xl font-bold mb-2 text-blue-300">Control Inteligente</h3>
        <p class="text-gray-300">Flujos de aprobación por rol, trazabilidad y seguridad avanzada.</p>
      </div>
      <div class="p-6 rounded-xl bg-gray-800 shadow-md hover:shadow-lg transition">
        <h3 class="text-xl font-bold mb-2 text-blue-300">IA Potente</h3>
        <p class="text-gray-300">Clasificación automática, búsqueda semántica y análisis normativo.</p>
      </div>
    </div>
  </section>
));
