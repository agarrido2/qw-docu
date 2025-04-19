/**
 * COMPONENTE EN DESUSO
 * 
 * Este componente ya no se utiliza. La lógica ha sido movida directamente a:
 * src/routes/(auth)/login/index.tsx
 * 
 * Esto evita problemas de referencias circulares y serialización en Qwik.
 */

import { component$ } from '@builder.io/qwik';

export const LoginForm = component$(() => {
  console.warn('LoginForm component is deprecated. Please use the login page component directly.');
  return (
    <div class="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
      Este componente está en desuso. Por favor, utiliza la página de login directamente.
    </div>
  );
});
