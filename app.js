import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jlcqmzvqtuqgfypnkodl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsY3FtenZxdHVxZ2Z5cG5rb2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzQ3ODYsImV4cCI6MjA1MTgxMDc4Nn0.DIwl9dVPvtpMH21DVnRtvYnuADc-BgJ5VLZ7Yvpn39Q";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById("login-form");
const loginContainer = document.getElementById("login-container");
const dashboardContainer = document.getElementById("dashboard-container");
const dashboardFrame = document.getElementById("dashboard-frame");
const logoutBtn = document.getElementById("logout-btn");

const DASHBOARD_LINKS = {
  link1: "https://app.powerbi.com/view?r=eyJrIjoiZjM0NTBjOWEtZDBlZC00YWQwLTkxMGQtYjI2MTQ2NjUyY2E4IiwidCI6IjljNjhhODZhLTdjMjAtNDhiNC1iMzUyLTExN2RlOTU4MjYzYSJ9",
  link2: "https://app.powerbi.com/view?r=eyJrIjoiZmQxMDk0ZDEtMzQyOS00ZTAxLWEyMmYtMjIxZmI1ZDdhNDU4IiwidCI6IjljNjhhODZhLTdjMjAtNDhiNC1iMzUyLTExN2RlOTU4MjYzYSJ9",
  link3: "https://app.powerbi.com/view?r=eyJrIjoiOTFiNWMzZjYtNTkxZC00ODg1LWFjN2QtZTc2MzkxZGM5OThkIiwidCI6IjdiNmE1ZGZhLTNjNWEtNDQxYS04MDI5LTlhMjIyY2QyNzQ5OCJ9",
};

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { user, error } = await supabase.auth.signInWithPassword({ email, password });

  if (user) {
    loginContainer.classList.add("hidden");
    dashboardContainer.classList.remove("hidden");
  } else {
    alert(error.message);
  }
});

document.querySelectorAll(".dashboard-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    const link = DASHBOARD_LINKS[btn.dataset.link];
    if (link) dashboardFrame.src = link;
  })
);

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  dashboardContainer.classList.add("hidden");
  loginContainer.classList.remove("hidden");
});

// Check if user is already logged in
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    loginContainer.classList.add("hidden");
    dashboardContainer.classList.remove("hidden");
  }
})();