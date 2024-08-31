import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import { Database } from '../../database.types';
import { storage } from './mmkv';

const supabaseUrl = 'https://xhobwrkhkzgvphzyqtem.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhob2J3cmtoa3pndnBoenlxdGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczMjQxNjgsImV4cCI6MjAzMjkwMDE2OH0.vhX79AjrfbJLbEJrAAQGm50RaMosFNDjzi5sVtvyIBc';

const MMKVAdapter = {
  getItem: (key: string) => {
    return storage.getString(key) || null;
  },
  setItem: (key: string, value: string) => {
    return storage.set(key, value);
  },
  removeItem: (key: string) => {
    return storage.delete(key);
  },
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: MMKVAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
