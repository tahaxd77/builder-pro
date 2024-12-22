import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://eahlrkbuqtgrqrzgxcmu.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhaGxya2J1cXRncnFyemd4Y211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMzg3NzAsImV4cCI6MjA0NjcxNDc3MH0.HAS4zrEspqRTKVD8R2qy8yrMoYxfZF-ZgzSPb5Rjjy0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})