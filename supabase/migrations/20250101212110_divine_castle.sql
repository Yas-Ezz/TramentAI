/*
  # Add subscription fields to profiles table
  
  1. Changes
    - Add subscription status fields to profiles table
    - Add subscription start and end date fields
    
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS subscribed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS subscription_start timestamptz,
ADD COLUMN IF NOT EXISTS subscription_end timestamptz;