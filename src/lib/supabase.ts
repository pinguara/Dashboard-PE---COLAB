import { createClient } from '@supabase/supabase-js';

// User provided credentials as fallbacks
const FALLBACK_URL = 'https://hpqzuuortmrfkjrhlxuh.supabase.co';
const FALLBACK_KEY = 'sb_publishable_FwJc0L57ABtJ9EFNEx4SBw_SpTOa1i-';

const getEnvVar = (value: any): string => {
  if (value === undefined || value === null) return '';
  const s = String(value).trim();
  if (s === 'undefined' || s === 'null' || s === '') return '';
  return s;
};

// Read from import.meta.env or fallback to the provided credentials
const envUrl = getEnvVar(import.meta.env.VITE_SUPABASE_URL);
const envKey = getEnvVar(import.meta.env.VITE_SUPABASE_ANON_KEY);

const rawUrl = envUrl || FALLBACK_URL;
const rawKey = envKey || FALLBACK_KEY;

// Utility to clean the Supabase URL by stripping trailing "/rest/v1/" paths
const cleanUrl = (url: string): string => {
  if (!url) return '';
  // Strip trailing slashes, /rest/v1/ or /rest/v1
  return url.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '').trim();
};

const resolvedUrl = cleanUrl(rawUrl);
const resolvedKey = rawKey;

const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

// Flag to check if credentials are placeholders or fully customized
const isPlaceholderKey = resolvedKey.startsWith('sb_publishable_') && resolvedKey.includes('6cDB4onIOffZPnZFHii8ww_aajR2_');
const isKeyInvalidUrl = resolvedKey.startsWith('https://') || resolvedKey.includes('.supabase.co');
const isUsingFallback = !envUrl || !envKey;

export const supabaseConfigInfo = {
  rawUrl,
  rawKey,
  resolvedUrl,
  resolvedKey,
  isPlaceholderKey,
  isKeyInvalidUrl,
  isUsingFallback
};

// Create the actual Supabase client, with defensive error catching to prevent startup crashes
export let supabase: any;

try {
  if (!resolvedUrl || !isValidUrl(resolvedUrl)) {
    throw new Error(`Invalid Supabase URL: "${resolvedUrl}"`);
  }
  supabase = createClient(resolvedUrl, resolvedKey);
} catch (e: any) {
  console.warn('Silent notice: Supabase initialization failed. Using defensive local fallback. Reason:', e?.message || e);
  // Fallback mock client to prevent app crashing
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: (callback: any) => {
        // Call with null session initially
        callback('SIGNED_OUT', null);
        return {
          data: {
            subscription: {
              unsubscribe: () => {}
            }
          }
        };
      },
      signUp: async () => ({ data: { user: null }, error: new Error('O cliente do Supabase não pôde ser inicializado devido a uma URL inválida.') }),
      signInWithPassword: async () => ({ data: { user: null }, error: new Error('O cliente do Supabase não pôde ser inicializado devido a uma URL inválida.') }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: async () => ({ data: null, error: null }),
      upsert: async () => ({ data: null, error: null }),
      delete: () => ({
        neq: async () => ({ data: null, error: null })
      })
    })
  } as any;
}
