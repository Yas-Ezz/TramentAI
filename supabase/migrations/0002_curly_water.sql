/*
  # Create trades table

  1. New Tables
    - `trades`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `date` (date)
      - `asset` (text)
      - `entry_price` (numeric)
      - `exit_price` (numeric)
      - `profit_loss` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `trades` table
    - Add policies for authenticated users to manage their own trades
*/

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

ALTER TABLE trades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own trades"
  ON trades
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);