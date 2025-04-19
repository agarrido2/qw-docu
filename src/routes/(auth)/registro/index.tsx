import { component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, routeAction$, zod$, z, Form, Link } from '@builder.io/qwik-city';
import { createServerSupabaseClient } from '~/integrations/supabase/server';

// Definir un esquema de validación con Zod para el registro
const registroSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'La confirmación de contraseña debe tener al menos 6 caracteres')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

// Route action para manejar el registro
export const useRegistroAction = routeAction$(
  async (data, requestEv) => {
    try {
      // Inicializar cliente de Supabase
      const supabase = createServerSupabaseClient(requestEv);
      
      // Registrar usuario en Supabase
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Error al registrar usuario'
        };
      }

      // Si el usuario se ha registrado correctamente pero no hay sesión (confirmación por email)
      if (!authData.session) {
        return {
          success: true,
          requiresEmailConfirmation: true,
          message: 'Se ha enviado un correo de confirmación a tu dirección de email'
        };
      }

      // Si hay sesión, se ha registrado y autenticado correctamente
      return {
        success: true,
        requiresEmailConfirmation: false
      };
    } catch (error: any) {
      return {
        success: false,
        error: error?.message || 'Error en el registro'
      };
    }
  },
  zod$(registroSchema)
);

export default component$(() => {
  const registroAction = useRegistroAction();
  const name = useSignal('');
  const email = useSignal('');
  const password = useSignal('');
  const confirmPassword = useSignal('');
  
  return (
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Crear cuenta</h2>
      
      <Form action={registroAction} class="space-y-4">
        {registroAction.value && registroAction.value.failed && (
          <div class="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {(registroAction.value.fieldErrors && (
              registroAction.value.fieldErrors.name || 
              registroAction.value.fieldErrors.email || 
              registroAction.value.fieldErrors.password || 
              registroAction.value.fieldErrors.confirmPassword
            )) || registroAction.value.error || 
             'Error al crear la cuenta'}
          </div>
        )}
        
        {registroAction.value?.success && registroAction.value.requiresEmailConfirmation && (
          <div class="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {registroAction.value.message || 'Se ha enviado un correo de confirmación a tu dirección de email'}
          </div>
        )}
        
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name.value}
            onInput$={(e: any) => (name.value = e.target.value)}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email.value}
            onInput$={(e: any) => (email.value = e.target.value)}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password.value}
            onInput$={(e: any) => (password.value = e.target.value)}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword.value}
            onInput$={(e: any) => (confirmPassword.value = e.target.value)}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={registroAction.isRunning}
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {registroAction.isRunning ? 'Registrando...' : 'Crear cuenta'}
        </button>
      </Form>
      
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" class="text-blue-600 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Registro | DocuGest',
  meta: [
    {
      name: 'description',
      content: 'Crea una cuenta en DocuGest para gestionar tus documentos',
    },
  ],
};
