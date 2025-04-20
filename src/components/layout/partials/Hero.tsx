import { component$ } from "@builder.io/qwik";

export const Hero = component$(() => (
  <section class="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden" aria-labelledby="hero-title">
    <div class="flex justify-center mb-6">
      <span class="bg-blue-800/80 text-blue-100 px-4 py-1 rounded-full text-xs font-semibold tracking-wider shadow-lg border border-blue-600 uppercase" aria-label="Inteligencia Artificial integrada">IA integrada</span>
    </div>
    <h1 id="hero-title" class="text-5xl md:text-6xl font-extrabold text-blue-100 mb-6 drop-shadow-lg">
      Transforma tu gestión documental<br />
      <span class="text-blue-400">con IA y automatización</span>
    </h1>
    <p class="max-w-2xl mx-auto text-lg md:text-xl text-blue-100/80 mb-8">
      Okios convierte tus documentos en procesos inteligentes, seguros y sin esfuerzo. Descubre la nueva era de la eficiencia empresarial.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center mb-10">
      <a href="#demo" class="inline-block px-8 py-4 text-lg font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 animate-pulse" aria-label="Solicitar demo gratuita">
        Solicita tu demo gratis
      </a>
      <a href="#beneficios" class="inline-block bg-white/10 hover:bg-white/20 text-blue-200 px-8 py-4 rounded-full text-lg font-semibold border border-blue-500 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2" aria-label="Ver beneficios">
        Ver beneficios
      </a>
    </div>
  </section>
));
