/*
  # Add trades table indexes
  
  Note: Previous migrations already created the trades table and initial indexes.
  This migration adds any missing indexes for better query performance.
*/

-- Drop existing indexes to avoid conflicts
DROP INDEX IF EXISTS trades_user_id_idx;
DROP INDEX IF EXISTS trades_date_idx;
DROP INDEX IF EXISTS trades_asset_idx;

-- Recreate indexes
CREATE INDEX trades_user_id_idx ON trades(user_id);
CREATE INDEX trades_date_idx ON trades(date);
CREATE INDEX trades_asset_idx ON trades(asset);