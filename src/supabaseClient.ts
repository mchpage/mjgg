import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtjgsfagvtpzgtlrzrrz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10amdzZmFndnRwemd0bHJ6cnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTYwMTksImV4cCI6MjA2OTAzMjAxOX0.JDUtvTUKzkxNg90Zr2LeXimKysF01ETw2ypYN9AOMUA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
