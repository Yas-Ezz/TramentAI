export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      trades: {
        Row: {
          id: string
          user_id: string
          date: string
          asset: string
          entry_price: number
          exit_price: number
          profit_loss: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          asset: string
          entry_price: number
          exit_price: number
          profit_loss: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          asset?: string
          entry_price?: number
          exit_price?: number
          profit_loss?: number
          created_at?: string
        }
      }
    }
  }
}