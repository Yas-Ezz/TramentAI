/*
  # Fix profile policies and add default values

  1. Changes
    - Add default values for timestamps
    - Update RLS policies for better security
    - Add index for email lookups

  2. Security
    - Enable RLS
    - Add policies for profile management
*/

-- Add default values for timestamps
ALTER TABLE profiles 
ALTER COLUMN created_at SET DEFAULT now(),
ALTER COLUMN updated_at SET DEFAULT now();

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;

-- Create new policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email 
ON profiles(email);