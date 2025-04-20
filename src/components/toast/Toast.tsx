import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';
import { useToast } from '../../context/toast-context';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
  duration?: number; // ms
}

export const Toast = component$(() => {
  const { toasts, removeToast } = useToast();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => toasts.value.length);
    toasts.value.forEach((toast: ToastMessage) => {
      if (toast.duration !== 0) {
        setTimeout(() => removeToast(toast.id), toast.duration || 3500);
      }
    });
  });

  return (
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.value.map((toast: ToastMessage) => (
        <div
          key={toast.id}
          class={twMerge(
            'px-4 py-2 rounded shadow-lg text-white flex items-center gap-2 min-w-[200px] animate-fade-in',
            toast.type === 'success' && 'bg-green-600',
            toast.type === 'error' && 'bg-red-600',
            toast.type === 'info' && 'bg-blue-600',
            toast.type === 'warning' && 'bg-yellow-500 text-black'
          )}
        >
          <span>
            {toast.type === 'success' && '✔️'}
            {toast.type === 'error' && '❌'}
            {toast.type === 'info' && 'ℹ️'}
            {toast.type === 'warning' && '⚠️'}
          </span>
          <span>{toast.message}</span>
          <button
            type="button"
            class="ml-auto text-white/80 hover:text-white px-2"
            onClick$={() => removeToast(toast.id)}
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
});
