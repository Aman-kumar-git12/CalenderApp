import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://isvsunjwcvlvzukxvafh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzdnN1bmp3Y3Zsdnp1a3h2YWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDg4NzcsImV4cCI6MjA2ODQ4NDg3N30.cSV4eT6ghCxecU_abbfPKQz5IO2BRJFOHlWW3df_MaU'

export const supabase = createClient(supabaseUrl, supabaseKey)
