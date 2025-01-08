import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jlcqmzvqtuqgfypnkodl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsY3FtenZxdHVxZ2Z5cG5rb2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzQ3ODYsImV4cCI6MjA1MTgxMDc4Nn0.DIwl9dVPvtpMH21DVnRtvYnuADc-BgJ5VLZ7Yvpn39Q";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    window.location.href = "main.html";
  }
});
