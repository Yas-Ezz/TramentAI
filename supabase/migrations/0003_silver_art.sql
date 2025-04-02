/*
  # Add indexes to trades table

  1. Changes
    - Add index on user_id for faster lookups
    - Add index on date for range queries
    - Add index on asset for filtering

  2. Notes
    - These indexes will improve query performance for common operations
    - No table structure or policy changes in this migration
*/

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS trades_user_id_idx ON trades(user_id);
CREATE INDEX IF NOT EXISTS trades_date_idx ON trades(date);
CREATE INDEX IF NOT EXISTS trades_asset_idx ON trades(asset);