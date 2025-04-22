import { component$ } from "@builder.io/qwik";

export const ProcessSteps = component$(() => (
  <section id="process-steps" class="py-20 px-6 text-center max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold mb-10 text-blue-400">¿Cómo funciona?</h2>
    <div class="grid md:grid-cols-4 gap-8">
      <div class="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
        <span class="text-4xl mb-3">📝</span>
        <h3 class="text-lg font-bold mb-2">Sube tu documento</h3>
        <p class="text-gray-300">Arrastra o sube PDFs, imágenes o emails en segundos.</p>
      </div>
      <div class="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
        <span class="text-4xl mb-3">🤖</span>
        <h3 class="text-lg font-bold mb-2">IA lo interpreta</h3>
        <p class="text-gray-300">Extrae datos, detecta errores y clasifica automáticamente.</p>
      </div>
      <div class="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
        <span class="text-4xl mb-3">✅</span>
        <h3 class="text-lg font-bold mb-2">Validación y control</h3>
        <p class="text-gray-300">Tu equipo revisa y aprueba desde cualquier dispositivo.</p>
      </div>
      <div class="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
        <span class="text-4xl mb-3">💸</span>
        <h3 class="text-lg font-bold mb-2">Todo listo y pagado</h3>
        <p class="text-gray-300">Contabilidad y pagos integrados sin errores ni pérdidas.</p>
      </div>
    </div>
  </section>
));
