// Sidebar Menu Functionality
const menuButtons = document.querySelectorAll(".menu-btn");
const submenus = document.querySelectorAll(".submenu");
const dashboardFrame = document.getElementById("dashboard-frame");
const dashboardTitle = document.getElementById("dashboard-title");

// Add click event to each menu button
menuButtons.forEach((menuButton) => {
  menuButton.addEventListener("click", () => {
    // Hide all submenus first
    submenus.forEach((submenu) => submenu.classList.add("hidden"));

    // Toggle submenu for the clicked button
    const module = menuButton.getAttribute("data-module");
    const submenu = document.getElementById(`${module}-submenu`);
    if (submenu) {
      submenu.classList.toggle("hidden");
    }
  });
});

// Add click event to submenu buttons to load Power BI dashboards
const submenuButtons = document.querySelectorAll(".submenu-btn");
submenuButtons.forEach((submenuButton) => {
  submenuButton.addEventListener("click", () => {
    const link = submenuButton.getAttribute("data-link");
    dashboardFrame.src = link;
    dashboardFrame.classList.remove("hidden");
    dashboardTitle.textContent = submenuButton.textContent;
  });
});

// Logout Button Functionality
const logoutButton = document.getElementById("logout-btn");
logoutButton.addEventListener("click", () => {
  // Redirect to login page
  window.location.href = "index.html";
});
