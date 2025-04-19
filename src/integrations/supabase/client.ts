import { createClient } from '@supabase/supabase-js';

// Tipos para los datos de nuestra aplicación
export type Database = {
  public: {
    tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      expedientes: {
        Row: {
          id: string;
          cliente_name: string;
          fecha: string;
          tipo_documento: string;
          descripcion: string;
          created_at: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          cliente_name: string;
          fecha?: string;
          tipo_documento: string;
          descripcion: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          id?: string;
          cliente_name?: string;
          fecha?: string;
          tipo_documento?: string;
          descripcion?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
        };
      };
      documentos: {
        Row: {
          id: string;
          nombre: string;
          ruta: string;
          tipo_archivo: string;
          tamano: number;
          created_at: string;
          expediente_id: string;
        };
        Insert: {
          id?: string;
          nombre: string;
          ruta: string;
          tipo_archivo: string;
          tamano: number;
          created_at?: string;
          expediente_id: string;
        };
        Update: {
          id?: string;
          nombre?: string;
          ruta?: string;
          tipo_archivo?: string;
          tamano?: number;
          created_at?: string;
          expediente_id?: string;
        };
      };
    };
  };
};

// Crear cliente de Supabase para uso en el cliente
export const createBrowserClient = () => {
  // Declarar explícitamente las URLs para evitar problemas de tipado
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;
  
  // Verificar que las variables de entorno estén definidas
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anonymous Key is missing');
    throw new Error('Supabase configuration is incomplete');
  }
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};
