import { component$, Slot, useTask$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, type RequestEventBase, type RequestHandler, useLocation, useNavigate } from "@builder.io/qwik-city";
import { Navbar } from "~/components/layout/partials/Navbar";
import { createServerSupabaseClient } from "~/integrations/supabase/server";


// Controles de cache
export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

// Action para cerrar sesión
export const useLogoutAction = routeAction$(async (_: unknown, requestEv: RequestEventBase) => {
  try {
    const supabase = createServerSupabaseClient(requestEv);
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return {
        success: false,
        error: error.message
      };
    }
    
    return {
      success: true
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || 'Error al cerrar sesión'
    };
  }
});

// Verificar sesión del usuario desde el servidor
export const useCheckSession = routeLoader$(async (requestEv: RequestEventBase) => {
  try {
    const supabase = createServerSupabaseClient(requestEv);
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error al verificar sesión:', error.message);
      return { session: null, user: null };
    }
    
    return { 
      session: data.session,
      user: data.session?.user || null
    };
  } catch (err) {
    console.error('Error en useCheckSession:', err);
    return { session: null, user: null };
  }
});

// Componente principal de layout
export default component$(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionData = useCheckSession();

  
  
  // Usar useTask$ para manejar las redirecciones, que es reactivo a cambios en sessionData
  useTask$(({ track }) => {
    // Rastrear los valores de sessionData y location para reaccionar a sus cambios
    track(() => sessionData.value.session);
    track(() => location.url.pathname);
    
    // Manejo de rutas protegidas y redirecciones
    const path = location.url.pathname;
    const hasSession = !!sessionData.value.session;
    
    // Rutas de login/registro ahora están en (auth), por lo que quedan como /login y /registro
    const isAuthRoute = path.includes('/login') || path.includes('/registro');
    const isProtectedRoute = !isAuthRoute && path !== '/';
    
    // Si está en una ruta protegida pero no tiene sesión, redirigir a login
    if (isProtectedRoute && !hasSession) {
      navigate('/login');
    }
    
    // Si está en una ruta de auth pero ya tiene sesión, redirigir a dashboard
    if (isAuthRoute && hasSession) {
      navigate('/dashboard/');
    }
  });
  
  return (
    <div class="min-h-screen flex flex-col">
      
       {/* Oculta el Navbar en rutas de autenticación */}
       {!(location.url.pathname.startsWith('/login') || location.url.pathname.startsWith('/registro') || location.url.pathname.startsWith('/auth')) && (
         <Navbar location={location} />
       )}
       <main class="flex-grow py-6 px-4 sm:px-6 lg:px-8">
         <Slot />
       </main>
    </div>
  );
});
