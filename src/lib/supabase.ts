import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zwwqkwzgncmjxihycijg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3d3Frd3pnbmNtanhpaHljaWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNTQwMDUsImV4cCI6MjA0NjkzMDAwNX0.tC1qGhgK-j_b17AF804D76TGlP561WmzNEKr9ZpQ3nM'; // Replace with your key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
