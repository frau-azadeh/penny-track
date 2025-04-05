import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qjeekbsdjaphrkrveckf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZWVrYnNkamFwaHJrcnZlY2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDkwNzAsImV4cCI6MjA1NjgyNTA3MH0.5Arx3Cjy3yNfNmO_K1BPFusgRdojO5rhHRW-Tr99M7k';

export const supabase = createClient(supabaseUrl, supabaseKey);
