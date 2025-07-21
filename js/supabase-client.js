import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
"https://ntbnkxwcjdycimlhjpih.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50Ym5reHdjamR5Y2ltbGhqcGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDY4MzUsImV4cCI6MjA2ODM4MjgzNX0.g6ICsBpyDJN1Iu4KBpQLsTt5eXZBWPA5F1sjmg04rXg",
{
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
)