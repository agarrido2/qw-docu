import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeAction$, z, Form, Link } from '@builder.io/qwik-city';
import { useAuthAction } from '~/hooks/useAuthAction';
import { createServerSupabaseClient } from '~/integrations/supabase/server';

// Definir un esquema de validación con Zod
const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Route action para manejar el inicio de sesión
// Tipo para el resultado de la acción de login
export interface LoginActionResult {
  success: boolean;
  failed?: boolean;
  error?: string;
  fieldErrors?: Record<string, string> | undefined;
}

export const useLoginAction = routeAction$<LoginActionResult>(
  async (data, requestEv) => {
    // Validación manual con Zod
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      // Mapear errores de Zod a fieldErrors
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
      }
      return {
        success: false,
        failed: true,
        fieldErrors,
        error: 'Error en los datos ingresados'
      };
    }
    const validData = result.data;
    try {
      // Inicializar cliente de Supabase
      const supabase = createServerSupabaseClient(requestEv);
      
      // Intentar iniciar sesión
      const { error } = await supabase.auth.signInWithPassword({
        email: String(validData.email),
        password: String(validData.password),
      });

      if (error) {
        // Traducir mensajes de error de Supabase a mensajes amigables
        let errorMessage = 'Error al iniciar sesión';
        
        // Detectar tipos de errores comunes
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Credenciales inválidas. Revisa tu email y contraseña.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Debes confirmar tu correo electrónico antes de iniciar sesión.';
        } else if (error.message.includes('too many requests')) {
          errorMessage = 'Demasiados intentos fallidos. Por favor, inténtalo de nuevo más tarde.';
        } else if (error.message.includes('not found')) {
          errorMessage = 'Usuario no encontrado. Verifica tu email o regístrate.';
        }
        
        console.error('Error de login:', error.message);
    
        return {
          success: false,
          failed: true,
          error: errorMessage
        };
      }

      // Si no hay error, se ha iniciado sesión correctamente
      // Redirigir a la página de dashboard
      throw requestEv.redirect(302, '/expedientes/');
    } catch (error: any) {
      if (error instanceof Response) {
        // Este es un error de redirección, lo dejamos pasar
        throw error;
      }
      return {
        success: false,
        failed: true,
        error: error?.message || 'Error al iniciar sesión'
      };

    }
  }
);

export default component$(() => {
  // Usa el custom hook reutilizable para manejar login y feedback
  const { action, email, password } = useAuthAction(useLoginAction());

  return (
    <div class="w-full max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-100 mb-6">Iniciar sesión</h2>
      
      <Form action={action} class="space-y-4">
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            placeholder="user@example.com"
            class="w-full p-2 border border-gray-300 rounded text-gray-900 font-semibold"
            bind:value={email}
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            class="w-full p-2 border border-gray-300 rounded text-gray-900 font-semibold"
            bind:value={password}
          />
        </div>
        
        <button
          type="submit"
          disabled={action.isRunning}
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {action.isRunning ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </Form>
      
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/registro" class="text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Iniciar sesión | DocuGest',
  meta: [
    {
      name: 'description',
      content: 'Inicia sesión en DocuGest para gestionar tus documentos',
    },
  ],
};
