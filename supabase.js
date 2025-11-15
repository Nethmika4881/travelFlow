import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tdjlgzpktfuiuapqqubm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkamxnenBrdGZ1aXVhcHFxdWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxNzIxNzgsImV4cCI6MjA3ODc0ODE3OH0.iLVQxED7u-hQ7YldIAuiqsEcCztI_3B4IZ-p4Nb3mWk";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
