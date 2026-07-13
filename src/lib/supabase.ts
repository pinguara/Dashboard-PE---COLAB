import { createClient } from '@supabase/supabase-js';

// 1. Parse URL
let rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();

let resolvedUrl = 'https://hpqzuuortmrfkjrhlxuh.supabase.co'; // Default to user's new project!
if (rawUrl) {
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    resolvedUrl = rawUrl;
  } else if (/^[a-z0-9]{20}$/i.test(rawUrl)) {
    resolvedUrl = `https://${rawUrl}.supabase.co`;
  } else {
    resolvedUrl = rawUrl.includes('.') ? `https://${rawUrl}` : `https://${rawUrl}.supabase.co`;
  }
}

// Ensure resolvedUrl has protocol
if (!resolvedUrl.startsWith('http://') && !resolvedUrl.startsWith('https://')) {
  resolvedUrl = `https://${resolvedUrl}`;
}

// Strip any trailing /rest/v1/ or /rest/v1 or trailing slashes added by user
resolvedUrl = resolvedUrl.replace(/\/rest\/v1\/?$/, '');
if (resolvedUrl.endsWith('/')) {
  resolvedUrl = resolvedUrl.slice(0, -1);
}

// 2. Parse Anon Key
let rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

let resolvedKey = 'sb_publishable_FwJc0L57ABtJ9EFNEx4SBw_SpTOa1i-'; // fallback token (User's new key)
let isKeyInvalidUrl = false;

if (rawKey) {
  if (rawKey.startsWith('http://') || rawKey.startsWith('https://') || rawKey.includes('/rest/v1')) {
    // User mistakenly copied the API URL / REST endpoint into the API Key field!
    isKeyInvalidUrl = true;
  } else if (rawKey.length > 20) {
    resolvedKey = rawKey;
  }
}

export const supabaseConfigInfo = {
  rawUrl,
  rawKey,
  resolvedUrl,
  resolvedKey,
  isKeyInvalidUrl,
  isPlaceholderKey: resolvedKey.startsWith('sb_publishable_'),
  isUsingFallback: resolvedKey === 'sb_publishable_FwJc0L57ABtJ9EFNEx4SBw_SpTOa1i-'
};

export const supabase = createClient(resolvedUrl, resolvedKey);
