import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not set. Auth will not work.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    global: {
      headers: {
        'Cache-Control': 'no-cache',
      },
    },
    realtime: {
      params: {
        eventsPerSecond: 2,
      },
    },
  }
)

export const CACHE_VERSION = 'v1'

export function getCacheKey(key) {
  return `${CACHE_VERSION}:${key}`
}

export function clearCache() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith('spw_cache_'))
  keys.forEach(k => localStorage.removeItem(k))
}
