import {
  createContextId,
  useContextProvider,
  useContext,
  useSignal,
  type Signal,
  component$,
  Slot,
  $,
} from '@builder.io/qwik';
import type { ToastMessage, ToastType } from '../components/toast/Toast';

interface ToastContextType {
  toasts: Signal<ToastMessage[]>;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContextId<ToastContextType>('toast-context');

export const ToastProvider = component$(() => {
  const toasts = useSignal<ToastMessage[]>([]);

  const addToast = $((toast: Omit<ToastMessage, 'id'>) => {
    toasts.value = [
      ...toasts.value,
      { ...toast, id: Date.now() + Math.random() },
    ];
  });

  const removeToast = $((id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  });

  useContextProvider(ToastContext, {
    toasts,
    addToast,
    removeToast,
  });

  return <Slot />;
});

export const useToast = () => useContext(ToastContext);
