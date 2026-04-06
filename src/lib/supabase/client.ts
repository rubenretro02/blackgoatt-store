import { createBrowserClient } from "@supabase/ssr";

// Demo mode flag when Supabase credentials are not available
const DEMO_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a mock client for demo mode
const createMockClient = () => ({
  auth: {
    getUser: async () => ({
      data: {
        user: {
          id: 'demo-user',
          email: 'demo@blackgoatt.com',
          user_metadata: { full_name: 'Demo User' }
        }
      },
      error: null
    }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: 'Demo mode - authentication disabled' } }),
    signUp: async () => ({ data: { user: null, session: null }, error: { message: 'Demo mode - registration disabled' } }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    updateUser: async () => ({ data: { user: null }, error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null }),
        }),
        single: () => Promise.resolve({ data: null, error: null }),
      }),
      order: () => ({
        limit: () => Promise.resolve({ data: [], error: null }),
      }),
    }),
  }),
});

export function createClient() {
  if (DEMO_MODE) {
    return createMockClient() as any;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
