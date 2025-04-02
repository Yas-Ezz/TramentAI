import { AuthError } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface AuthResult {
  error: string | null;
  success: boolean;
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { error: null, success: true };
  } catch (error) {
    const authError = error as AuthError;
    return {
      error: getAuthErrorMessage(authError),
      success: false
    };
  }
}

export async function signUp(email: string, password: string): Promise<AuthResult> {
  try {
    const { error: signUpError, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { email }
      }
    });

    if (signUpError) throw signUpError;
    if (!data.user) throw new Error('No user data returned');
    
    return { error: null, success: true };
  } catch (error) {
    console.error('Signup error:', error);
    const authError = error as AuthError;
    return {
      error: getAuthErrorMessage(authError),
      success: false
    };
  }
}

function getAuthErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Invalid email or password. Please try again.';
    case 'Email not confirmed':
      return 'Please confirm your email address before logging in.';
    default:
      return error.message;
  }
}