const header = document.querySelector("[data-header]");
const burgerBtn = document.querySelector(".burgerBtn");
const headerMenu = document.querySelector(".mobileMenu");
const closeBtn = document.querySelector(".closeBtn");

function setMenuState(isOpen) {
  if (!headerMenu || !burgerBtn) return;
  headerMenu.classList.toggle("mobile-menu-active", isOpen);
  headerMenu.setAttribute("aria-hidden", String(!isOpen));
  burgerBtn.setAttribute("aria-expanded", String(isOpen));
}

burgerBtn?.addEventListener("click", () => setMenuState(true));
closeBtn?.addEventListener("click", () => setMenuState(false));

headerMenu?.addEventListener("click", (event) => {
  if (event.target.closest(".mobile-nav-link")) {
    setMenuState(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

function updateHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function setActiveLinks() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".header-nav a, .mobile-nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const hrefFile = href.split("#")[0].split("/").pop() || "index.html";
    if (hrefFile === currentFile) {
      link.classList.add("header-link-active");
    }
  });
}

updateHeaderState();
setActiveLinks();
window.addEventListener("scroll", updateHeaderState, { passive: true });
