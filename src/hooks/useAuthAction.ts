import { useSignal, useTask$ } from '@builder.io/qwik';
import { useToastMessage } from './useToast';
import { type LoginActionResult } from '~/routes/(auth)/login/index';

/**
 * Custom hook para manejar acciones de autenticación reutilizables (login, registro, etc.).
 * @param action Instancia de routeAction$ (ej: useLoginAction())
 * @returns { action, email, password }
 */
export function useAuthAction(action: any) {
  const email = useSignal('');
  const password = useSignal('');
  const { showError } = useToastMessage();

  useTask$(({ track }) => {
    track(() => action.value);
    if (action.value?.failed) {
      let message = '';
      const fieldErrors = action.value.fieldErrors as Record<string, string> | undefined;
      if (fieldErrors && (typeof fieldErrors.email === 'string' || typeof fieldErrors.password === 'string')) {
        message = fieldErrors.email || fieldErrors.password || 'Error en los datos ingresados';
      } else {
        message = (action.value as any).error || 'Error al iniciar sesión';
      }
      showError(message);
      email.value = '';
      password.value = '';
    }
  });

  return { action, email, password };
}
