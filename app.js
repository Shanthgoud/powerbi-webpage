import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "your-supabase-url";
const SUPABASE_ANON_KEY = "your-supabase-anon-key";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const loginForm = document.getElementById("login-form");
const loginContainer = document.getElementById("login-container");
const dashboardContainer = document.getElementById("dashboard-container");
const dashboardFrame = document.getElementById("dashboard-frame");
const logoutBtn = document.getElementById("logout-btn");

const DASHBOARD_LINKS = {
  link1: "https://app.powerbi.com/reportEmbed?reportId=your-report-id-1",
  link2: "https://app.powerbi.com/reportEmbed?reportId=your-report-id-2",
  link3: "https://app.powerbi.com/reportEmbed?reportId=your-report-id-3",
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