import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from './env.js';

let supabaseClient: SupabaseClient | null = null;

if (config.isSupabaseConfigured) {
  try {
    const key = config.supabase.serviceRoleKey || config.supabase.anonKey;
    supabaseClient = createClient(config.supabase.url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    console.log('[Database] Supabase client initialized successfully.');
  } catch (error) {
    console.warn('[Database] Failed to initialize Supabase client:', error);
    supabaseClient = null;
  }
} else {
  console.log('[Database] Supabase credentials not found in env. Operating in integrated resilient fallback storage mode.');
}

export const getSupabaseClient = (): SupabaseClient | null => supabaseClient;
