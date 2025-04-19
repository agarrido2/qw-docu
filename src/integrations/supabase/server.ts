import type { RequestEventBase } from '@builder.io/qwik-city';
import { createServerClient } from 'supabase-auth-helpers-qwik';
import type { Database } from './client';

// Crear cliente de Supabase para uso en el servidor
export const createServerSupabaseClient = (requestEv: RequestEventBase) => {
  return createServerClient<Database>(
    requestEv.env.get('PUBLIC_SUPABASE_URL')!,
    requestEv.env.get('PUBLIC_SUPABASE_ANON_KEY')!,
    requestEv
  );
};
