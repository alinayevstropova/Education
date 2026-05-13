const body = document.body;
const header = document.querySelector(".header");

const burgerBtn = document.querySelector(".burgerBtn");
const headerMenu = document.querySelector(".mobileMenu");
const closeBtn = document.querySelector(".closeBtn");

function openMenu() {
  headerMenu.classList.add("mobile-menu-active");
}

function closeMenu() {
  headerMenu.classList.remove("mobile-menu-active");
}

burgerBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
headerMenu.addEventListener("click", (e) => {
  if (e.target.classList.contains("mobile-nav-link")) {
    closeMenu();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const currentPage =
    window.location.pathname.split("/")[1].split(".")[0] || "index";

  const setActiveLink = (selector) => {
    document.querySelectorAll(selector).forEach((link) => {
      const linkPage = link.getAttribute("href").split("/")[1].split(".")[0];

      if (linkPage === currentPage) {
        link.classList.add("header-link-active");
      }
    });
  };

  setActiveLink(".header-nav a");
  setActiveLink(".mobile-nav a, .mobile-nav-link");
});
