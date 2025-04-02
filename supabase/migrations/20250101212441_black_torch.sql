-- Add RLS policies for subscription fields
CREATE POLICY "Users can read own subscription"
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

-- Add indexes for subscription queries
CREATE INDEX IF NOT EXISTS idx_profiles_subscription 
ON profiles(id, subscribed, subscription_end);