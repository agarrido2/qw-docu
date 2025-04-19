import { createContextId, type Signal, Slot, component$, useContextProvider, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { createBrowserClient } from '~/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

// Tipo para nuestro contexto de autenticación
interface AuthContext {
  user: Signal<User | null>;
  isLoading: Signal<boolean>;
}

// Crear un ID para nuestro contexto
export const AuthContext = createContextId<AuthContext>('auth-context');

// Componente proveedor del contexto de autenticación
export const AuthProvider = component$(() => {
  const user = useSignal<User | null>(null);
  const isLoading = useSignal(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Proporcionar el contexto
  useContextProvider(AuthContext, {
    user,
    isLoading,
  });

  // Manejo robusto de autenticación y redirección
  useVisibleTask$(() => {
    const supabase = createBrowserClient();

    // Comprobar sesión al cargar
    supabase.auth.getSession().then(({ data }) => {
      user.value = data.session?.user || null;
      isLoading.value = false;
      // Si ya está autenticado y está en login/registro, redirigir
      if (
        user.value &&
        (location.url.pathname.includes('/login') || location.url.pathname.includes('/registro'))
      ) {
        navigate('/dashboard/');
      }
    });

    // Suscribirse a cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user || null;
      if (
        event === 'SIGNED_IN' &&
        (location.url.pathname.includes('/login') || location.url.pathname.includes('/registro'))
      ) {
        navigate('/dashboard/');
      } else if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
    });

    // Limpiar el listener al desmontar
    return () => {
      subscription.unsubscribe();
    };
  });

  return <Slot />;
});
