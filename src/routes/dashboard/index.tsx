import { component$, useSignal } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { createServerSupabaseClient } from '~/integrations/supabase/server';

// Cargar información del usuario y datos resumidos
export const useDashboardData = routeLoader$(async (requestEv) => {
  const supabase = createServerSupabaseClient(requestEv);
  
  // Obtener datos de sesión
  const { data: { session } } = await supabase.auth.getSession();
  
  // Si no hay sesión, devolver datos vacíos
  if (!session) {
    return { 
      user: null,
      expedientesCount: 0,
      documentosCount: 0,
      recientesCount: 0
    };
  }
  
  // En un caso real, aquí harías consultas a la base de datos
  // para obtener estadísticas sobre expedientes y documentos
  
  return {
    user: session.user,
    // Estos son datos de ejemplo, en la implementación real 
    // vendrían de consultas a la base de datos
    expedientesCount: 12,
    documentosCount: 47,
    recientesCount: 5
  };
});

export default component$(() => {
  const dashboardData = useDashboardData();
  const activeTab = useSignal('todos');
  
  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div>
          <button 
            class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo expediente
          </button>
        </div>
      </div>
      
      {/* Tarjetas de resumen */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Expedientes</p>
              <p class="text-3xl font-bold">{dashboardData.value.expedientesCount}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Documentos totales</p>
              <p class="text-3xl font-bold">{dashboardData.value.documentosCount}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Actividad reciente</p>
              <p class="text-3xl font-bold">{dashboardData.value.recientesCount}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pestañas */}
      <div class="mb-6 border-b border-gray-200">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li class="mr-2">
            <button 
              onClick$={() => activeTab.value = 'todos'}
              class={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${activeTab.value === 'todos' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
            >
              Todos los expedientes
            </button>
          </li>
          <li class="mr-2">
            <button 
              onClick$={() => activeTab.value = 'recientes'}
              class={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${activeTab.value === 'recientes' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
            >
              Recientes
            </button>
          </li>
          <li class="mr-2">
            <button 
              onClick$={() => activeTab.value = 'favoritos'}
              class={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${activeTab.value === 'favoritos' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
            >
              Favoritos
            </button>
          </li>
        </ul>
      </div>
      
      {/* Tabla de expedientes */}
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documentos
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {/* Mostrar mensaje si no hay expedientes */}
            {dashboardData.value.expedientesCount === 0 ? (
              <tr>
                <td colSpan={5} class="px-6 py-10 text-center text-gray-500">
                  No hay expedientes disponibles. ¡Crea tu primer expediente!
                </td>
              </tr>
            ) : (
              /* Expedientes de ejemplo */
              <>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">Empresa ABC, S.L.</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Factura
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    15/01/2025
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Ver</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">Editar</a>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">García Pérez, Antonio</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Contrato
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    03/02/2025
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Ver</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">Editar</a>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">Inversiones XYZ</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      Presupuesto
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    27/03/2025
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Ver</a>
                    <a href="#" class="text-gray-600 hover:text-gray-900">Editar</a>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});