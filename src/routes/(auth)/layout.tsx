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
      (typeof error === 'object' && error && error.constructor.name === 'RedirectMessage')
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
    <div class="min-h-screen flex items-start justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 relative pt-10 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Fondo decorativo con desenfoque */}
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-900 opacity-40 rounded-full blur-3xl"></div>
        <div class="absolute bottom-[-80px] right-[-80px] w-[220px] h-[220px] bg-blue-700 opacity-30 rounded-full blur-2xl"></div>
        <div class="absolute top-1/2 left-1/2 w-[120px] h-[120px] bg-blue-400 opacity-20 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div class="w-full max-w-md z-10">
        <div class="text-center mb-8 border border-blue-900/40 rounded-xl p-6 shadow-lg bg-gray-900/80 backdrop-blur-md">
          <h1 class="text-4xl font-extrabold text-blue-200 tracking-tight drop-shadow">Okios Doc</h1>
          <p class="mt-2 text-blue-100">Gestión documental con IA</p>
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
