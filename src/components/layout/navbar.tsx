import { component$ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { useCheckSession, useLogoutAction } from '~/routes/layout';

export const Navbar = component$(() => {
  const sessionData = useCheckSession();
  const logoutAction = useLogoutAction();
  const navigate = useNavigate();
  const user = sessionData.value.user;
  
  return (
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <Link href="/" class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-blue-600">DocuGest</h1>
            </Link>
            
            {user && (
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link 
                  href="/dashboard/" 
                  class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          
          <div class="flex items-center">
            {user ? (
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-700">
                  {user.email}
                </span>
                
                <button
                  onClick$={async () => {
                    await logoutAction.submit();
                    navigate('/login');
                  }}
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div class="flex items-center space-x-4">
                <Link
                  href="/login"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Iniciar sesión
                </Link>
                
                <Link
                  href="/registro"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});
