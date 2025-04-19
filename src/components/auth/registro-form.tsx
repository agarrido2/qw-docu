import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import { Form, Link } from '@builder.io/qwik-city';
import { createBrowserClient } from '~/integrations/supabase/client';

export const RegistroForm = component$(() => {
  const name = useSignal('');
  const email = useSignal('');
  const password = useSignal('');
  const confirmPassword = useSignal('');
  const errorMessage = useSignal('');
  const successMessage = useSignal('');
  const isLoading = useSignal(false);
  const supabaseClient = useSignal<any>(null);

  // Inicializar el cliente de Supabase cuando el componente es visible
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    try {
      supabaseClient.value = createBrowserClient();
      console.log('Supabase client initialized successfully in registro form');
    } catch (error) {
      console.error('Error initializing Supabase client:', error);
      errorMessage.value = 'Error de configuración: No se pudo inicializar la conexión';
    }
  });

  // Función para manejar el registro
  const handleRegistro = $(async () => {
    if (!name.value || !email.value || !password.value) {
      errorMessage.value = 'Por favor, complete todos los campos';
      return;
    }

    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Las contraseñas no coinciden';
      return;
    }

    if (password.value.length < 6) {
      errorMessage.value = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    try {
      isLoading.value = true;
      errorMessage.value = '';
      successMessage.value = '';

      // Registrar usuario en Supabase
      const { data, error } = await supabaseClient.value.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            name: name.value,
          },
        },
      });

      if (error) {
        errorMessage.value = error.message || 'Error al registrar usuario';
        return;
      }

      if (data) {
        // Si es necesario confirmar el correo
        if (!data.session) {
          successMessage.value = 'Se ha enviado un correo de confirmación a tu dirección de email';
        }

        // Actualizar el perfil del usuario con el nombre
        if (data.user) {
          const { error: profileError } = await supabaseClient.value
            .from('users')
            .insert([
              {
                id: data.user.id,
                email: data.user.email,
                name: name.value,
              },
            ]);

          if (profileError) {
            console.error('Error al guardar perfil:', profileError);
          }
        }
      }
    } catch (error: any) {
      errorMessage.value = error?.message || 'Error en el registro';
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div class="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Crear cuenta</h2>
      
      <Form onSubmit$={handleRegistro} class="space-y-4">
        {errorMessage.value && (
          <div class="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage.value}
          </div>
        )}

        {successMessage.value && (
          <div class="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage.value}
          </div>
        )}
        
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            id="name"
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
            type="password"
            value={confirmPassword.value}
            onInput$={(e: any) => (confirmPassword.value = e.target.value)}
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading.value}
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          {isLoading.value ? 'Registrando...' : 'Crear cuenta'}
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
