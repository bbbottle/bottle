import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://cvxqmusfaxwuyvyuueco.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2eHFtdXNmYXh3dXl2eXV1ZWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ4MjkwNTEsImV4cCI6MTk2MDQwNTA1MX0.lg90OVR7s6tjbDamVaI9FR2M2fc6OVfsfGd4j9MXu3M";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
