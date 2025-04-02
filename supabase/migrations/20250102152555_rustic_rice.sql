/*
  # Update subscription system
  
  1. Changes
    - Add subscription_status enum type
    - Add trial and subscription tracking columns
    - Add subscription_id for PayPal reference
    
  2. Security
    - Update RLS policies for subscription fields
*/

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Users can read own subscription status" ON profiles;
DROP POLICY IF EXISTS "Users can update own subscription" ON profiles;

-- Create subscription status enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM (
    'trialing',
    'active',
    'past_due',
    'canceled',
    'expired'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Add new columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS subscription_status subscription_status DEFAULT 'expired',
ADD COLUMN IF NOT EXISTS trial_start timestamptz,
ADD COLUMN IF NOT EXISTS trial_end timestamptz,
ADD COLUMN IF NOT EXISTS subscription_id text;

-- Add index for subscription queries
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status
ON profiles(subscription_status, trial_end, subscription_end);

-- Create new policies
CREATE POLICY "Users can read own subscription status"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own subscription"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);