import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { createServerSupabaseClient } from '~/integrations/supabase/server';

// RouteLoader que inicializa la conexión con Supabase y verifica el estado de autenticación
export const useSupabaseAuth = routeLoader$(async (requestEv) => {
  try {
    // Inicializar cliente de Supabase en el servidor
    const supabase = createServerSupabaseClient(requestEv);
    
    // Verificar si hay una sesión activa
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error al obtener sesión:', error.message);
      return { 
        isAuthenticated: false,
        user: null,
        error: error.message
      };
    }
    
    // Si el usuario ya está autenticado y está intentando acceder a login/registro,
    // redirigir a la página principal de expedientes
    if (data.session) {
      const path = requestEv.url.pathname;
      if (path.includes('/login') || path.includes('/registro')) {
        throw requestEv.redirect(302, '/dashboard/');
      }
      
      return {
        isAuthenticated: true,
        user: data.session.user,
        error: null
      };
    }
    
    return {
      isAuthenticated: false,
      user: null,
      error: null
    };
  } catch (error) {
    // Filtra tanto Response como RedirectMessage (Qwik City)
    if (
      error instanceof Response ||
      (typeof error === 'object' && error && error.constructor?.name === 'RedirectMessage')
    ) {
      throw error;
    }
    
    console.error('Error en el routeLoader de autenticación:', error);
    return {
      isAuthenticated: false,
      user: null,
      error: 'Error interno del servidor'
    };
  }
});

export default component$(() => {
  // Usar el routeLoader para verificar la autenticación
  const authData = useSupabaseAuth();
  
  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-extrabold text-gray-900">DocuGest</h1>
          <p class="mt-2 text-gray-600">Gestión documental simplificada</p>
          
          {authData.value.error && (
            <div class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {authData.value.error}
            </div>
          )}
        </div>
        
        <Slot />
      </div>
    </div>
  );
});
