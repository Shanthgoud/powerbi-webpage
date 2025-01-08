import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://jlcqmzvqtuqgfypnkodl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsY3FtenZxdHVxZ2Z5cG5rb2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzQ3ODYsImV4cCI6MjA1MTgxMDc4Nn0.DIwl9dVPvtpMH21DVnRtvYnuADc-BgJ5VLZ7Yvpn39Q";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const loginContainer = document.getElementById("login-container");
const dashboardContainer = document.getElementById("dashboard-container");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const menuButtons = document.querySelectorAll(".menu-btn");
const submenuButtons = document.querySelectorAll(".submenu-btn");
const dashboardFrame = document.getElementById("dashboard-frame");
const dashboardTitle = document.getElementById("dashboard-title");

// Dashboard Links
const DASHBOARD_LINKS = {
  "attendance-live": { title: "Attendance - Live Dashboard", url: "https://app.powerbi.com/view?r=eyJrIjoiNGRhNjY0OGMtN2JkMy00NDlkLTk2NWQtN2UxMjg0MjU5NTYyIiwidCI6IjA1ZDdjZWIyLTQwOTItNDliOS05NWFmLWE1OWRiNmExY2Y4ZCJ9" },
  "attendance-trend": { title: "Attendance - Trend Dashboard", url: "https://app.powerbi.com/view?r=eyJrIjoiNjQ4ZThmZDYtZTA4ZC00ZTZjLWI0MTAtNzRjOTFlNjYyNDc4IiwidCI6IjA1ZDdjZWIyLTQwOTItNDliOS05NWFmLWE1OWRiNmExY2Y4ZCJ9" },
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

// Handle Menu Buttons
menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Highlight Active Menu Button
    menuButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Toggle Submenu Visibility
    const module = button.getAttribute("data-module");
    document.querySelectorAll(".submenu").forEach((submenu) => submenu.classList.add("hidden"));
    const submenu = document.getElementById(${module}-submenu);
    if (submenu) submenu.classList.remove("hidden");

    // Clear Main Content
    dashboardFrame.src = "";
    dashboardFrame.classList.add("hidden");
    dashboardTitle.textContent = "Select a Dashboard";
  });
});

// Handle Submenu Buttons
submenuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Highlight Active Submenu Button
    submenuButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Load Dashboard
    const link = button.getAttribute("data-link");
    const { title, url } = DASHBOARD_LINKS[link];
    dashboardTitle.textContent = title;
    dashboardFrame.src = url;
    dashboardFrame.classList.remove("hidden");
  });
});

// Initialize
checkSession();