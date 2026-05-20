import createClient from '@/lib/supabase/client';

type AuthResult = {
  error: Error | null;
};

export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return {
    error: error ? new Error(error.message) : null,
  };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  return {
    error: error ? new Error(error.message) : null,
  };
}

export async function signOut(): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  return {
    error: error ? new Error(error.message) : null,
  };
}
