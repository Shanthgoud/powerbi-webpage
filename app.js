import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jlcqmzvqtuqgfypnkodl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsY3FtenZxdHVxZ2Z5cG5rb2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzQ3ODYsImV4cCI6MjA1MTgxMDc4Nn0.DIwl9dVPvtpMH21DVnRtvYnuADc-BgJ5VLZ7Yvpn39Q";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const loginContainer = document.getElementById("login-container");
const dashboardContainer = document.getElementById("dashboard-container");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const dashboardButtons = document.querySelectorAll(".dashboard-btn");
const dashboardFrame = document.getElementById("dashboard-frame");
const dashboardTitle = document.getElementById("dashboard-title");

// Dashboard links
const DASHBOARD_LINKS = {
  link1: { title: "Attendance Dashboard", url: "https://app.powerbi.com/view?r=eyJrIjoiZjM0NTBjOWEtZDBlZC00YWQwLTkxMGQtYjI2MTQ2NjUyY2E4IiwidCI6IjljNjhhODZhLTdjMjAtNDhiNC1iMzUyLTExN2RlOTU4MjYzYSJ9" },
  link2: { title: "Assessment Dashboard", url: "https://app.powerbi.com/view?r=eyJrIjoiZmQxMDk0ZDEtMzQyOS00ZTAxLWEyMmYtMjIxZmI1ZDdhNDU4IiwidCI6IjljNjhhODZhLTdjMjAtNDhiNC1iMzUyLTExN2RlOTU4MjYzYSJ9" },
  link3: { title: "Administration Dashboard", url: "https://app.powerbi.com/view?r=eyJrIjoiOTFiNWMzZjYtNTkxZC00ODg1LWFjN2QtZTc2MzkxZGM5OThkIiwidCI6IjdiNmE1ZGZhLTNjNWEtNDQxYS04MDI5LTlhMjIyY2QyNzQ5OCJ9" },
};

// Show/Hide Containers
function toggleContainers(showLogin) {
  if (showLogin) {
    loginContainer.classList.remove("hidden");
    dashboardContainer.classList.add("hidden");
  } else {
    loginContainer.classList.add("hidden");
    dashboardContainer.classList.remove("hidden");
  }
}

// Check Session on Load
async function checkSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    toggleContainers(false);
  } else {
    toggleContainers(true);
  }
}

// Login Functionality
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert("Login failed: " + error.message);
  } else {
    toggleContainers(false);
  }
});

// Logout Functionality
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  toggleContainers(true);
});

// Handle Dashboard Buttons
dashboardButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const link = button.getAttribute("data-link");
    const { title, url } = DASHBOARD_LINKS[link];
    dashboardTitle.textContent = title;
    dashboardFrame.src = url;
    dashboardFrame.classList.remove("hidden");
  });
});

// Initialize
checkSession();
