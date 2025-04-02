/*
  # Add indexes to trades table

  1. Changes
    - Add indexes for frequently queried columns:
      - user_id
      - date
      - asset
  
  Note: Table and RLS policy already exist from previous migration
*/

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS trades_user_id_idx ON trades(user_id);
CREATE INDEX IF NOT EXISTS trades_date_idx ON trades(date);
CREATE INDEX IF NOT EXISTS trades_asset_idx ON trades(asset);