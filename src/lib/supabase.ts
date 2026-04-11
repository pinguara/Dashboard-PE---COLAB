import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL.startsWith('http')) 
  ? import.meta.env.VITE_SUPABASE_URL 
  : 'https://sqboccgjrfzltvkqpkih.supabase.co';

const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY && import.meta.env.VITE_SUPABASE_ANON_KEY.length > 10)
  ? import.meta.env.VITE_SUPABASE_ANON_KEY
  : 'sb_publishable_6cDB4onIOffZPnZFHii8ww_aajR2_-S';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
