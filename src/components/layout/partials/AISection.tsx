import { component$ } from "@builder.io/qwik";

export const AISection = component$(() => (
  <section id="ai-section" class="bg-gradient-to-r from-blue-900 via-gray-900 to-gray-950 py-20 px-6">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-6 text-blue-400">Inteligencia Artificial aplicada</h2>
      <p class="text-xl mb-8 text-blue-100">OKIOS utiliza IA para automatizar la clasificación, mejorar documentos y ofrecer búsqueda semántica avanzada.</p>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
          <span class="text-4xl mb-3">🔎</span>
          <h3 class="text-lg font-bold mb-2 text-blue-300">Búsqueda semántica</h3>
          <p class="text-gray-300">Encuentra documentos por significado, no sólo por título.</p>
        </div>
        <div class="bg-gray-800 p-6 rounded-xl shadow flex flex-col items-center">
          <span class="text-4xl mb-3">✍️</span>
          <h3 class="text-lg font-bold mb-2 text-blue-300">Redacción y mejora</h3>
          <p class="text-gray-300">La IA te ayuda a redactar y optimizar el contenido de tus documentos.</p>
        </div>
      </div>
    </div>
  </section>
));
