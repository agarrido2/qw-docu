import { $ } from '@builder.io/qwik';
import { useToast } from '../context/toast-context';
import type { ToastType } from '../components/toast/Toast';

/**
 * Custom hook para mostrar toasts de error, éxito, info y warning de forma sencilla.
 * Ejemplo de uso: const { showError, showSuccess } = useToastMessage();
 */
export function useToastMessage() {
  const { addToast } = useToast();

  const showToast = $((type: ToastType, message: string, duration?: number) => {
    addToast({ type, message, duration });
  });

  const showError = $((message: string, duration?: number) => {
    showToast('error', message, duration);
  });

  const showSuccess = $((message: string, duration?: number) => {
    showToast('success', message, duration);
  });

  const showInfo = $((message: string, duration?: number) => {
    showToast('info', message, duration);
  });

  const showWarning = $((message: string, duration?: number) => {
    showToast('warning', message, duration);
  });

  return { showToast, showError, showSuccess, showInfo, showWarning };
}
