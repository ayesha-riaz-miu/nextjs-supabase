import { createClient } from "@supabase/supabase-js"

const supabase_url = process.env.NEXT_PUBLIC_SUPABSE_URL!;
const supabase_anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase_client = createClient(supabase_url,supabase_anonKey)