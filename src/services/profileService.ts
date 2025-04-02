import { supabase } from '../lib/supabase';
import { Profile } from '../types';

class ProfileService {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Failed to fetch profile:', error);
      throw new Error('Unable to verify user profile');
    }

    return data;
  }
}

export const profileService = new ProfileService();