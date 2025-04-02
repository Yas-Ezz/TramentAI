/*
  # Update trades table and indexes

  1. Changes
    - Drop existing policy if it exists
    - Create table if not exists
    - Add indexes for performance optimization
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can manage own trades" ON trades;

-- Create table if not exists
CREATE TABLE IF NOT EXISTS trades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  date date NOT NULL,
  asset text NOT NULL,
  entry_price numeric(20, 2) NOT NULL,
  exit_price numeric(20, 2) NOT NULL,
  profit_loss numeric(20, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Users can manage own trades"
  ON trades
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Drop existing indexes to avoid conflicts
DROP INDEX IF EXISTS trades_user_id_idx;
DROP INDEX IF EXISTS trades_date_idx;
DROP INDEX IF EXISTS trades_asset_idx;

-- Create indexes for better performance
CREATE INDEX trades_user_id_idx ON trades(user_id);
CREATE INDEX trades_date_idx ON trades(date);
CREATE INDEX trades_asset_idx ON trades(asset);