require("dotenv").config();
const supabase = require("@supabase/supabase-js");

const supabaseClient = supabase.createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_KEY);

module.exports = supabaseClient;
