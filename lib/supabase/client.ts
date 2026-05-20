// 브라우저 전용 Supabase 클라이언트 (Next.js App Router용)
// 규칙: App Router만 사용, `createClient` 직접 사용 금지
import { createBrowserClient } from '@supabase/ssr';

const isBrowser = typeof window !== 'undefined';

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (!isBrowser) {
    throw new Error('createClient() must be called in the browser (client-side).');
  }

  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables');
  }

  client = createBrowserClient(url, anonKey);
  return client;
}

export const getBrowserSupabase = createClient;

export default createClient;
