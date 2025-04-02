/*
  # Fix Profile Handling and Subscription Fields

  1. Changes
    - Set default values for subscription fields and timestamps
    - Update indexes for better performance
    - Update RLS policies for better security

  2. Security
    - Maintain RLS policies
    - Add policy for subscription management
*/

-- Set default values for subscription fields and timestamps
ALTER TABLE profiles
ALTER COLUMN subscribed SET DEFAULT false,
ALTER COLUMN created_at SET DEFAULT now(),
ALTER COLUMN updated_at SET DEFAULT now();

-- Update indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_subscription 
ON profiles(id, subscribed, subscription_end);

CREATE INDEX IF NOT EXISTS idx_profiles_email 
ON profiles(email);

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can manage own profile" ON profiles;

-- Create comprehensive policy for profile management
CREATE POLICY "Users can manage own profile"
  ON profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);