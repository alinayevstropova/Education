const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initReveal() {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function initTrackSwitcher() {
  const trackData = {
    career: {
      kicker: "Career accelerator",
      title: "From unsure to financially fluent.",
      description:
        "Learn how to read offers, manage income, invest consistently, and talk about money without feeling behind.",
      items: [
        "Personal finance operating system",
        "Investment basics without jargon",
        "Mentor review of your plan",
      ],
    },
    founder: {
      kicker: "Founder studio",
      title: "Turn financial chaos into operating rhythm.",
      description:
        "Build confidence around runway, pricing, margins, funding trade-offs, and the weekly numbers that actually matter.",
      items: [
        "Revenue and runway scenarios",
        "Pricing and margin lab",
        "Board-ready financial narrative",
      ],
    },
    team: {
      kicker: "Team cohort",
      title: "Give everyone the same financial language.",
      description:
        "Create shared habits for budgets, risk, forecasting, and growth conversations across departments.",
      items: [
        "Private workshops for your team",
        "Company-specific case simulations",
        "Shared dashboards and decision rituals",
      ],
    },
  };

  const buttons = document.querySelectorAll(".track-btn");
  const card = document.querySelector("[data-track-card]");
  if (!buttons.length || !card) return;

  const kicker = card.querySelector("[data-track-kicker]");
  const title = card.querySelector("[data-track-title]");
  const description = card.querySelector("[data-track-description]");
  const list = card.querySelector("[data-track-list]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.track;
      const content = trackData[selected];
      if (!content) return;

      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      kicker.textContent = content.kicker;
      title.textContent = content.title;
      description.textContent = content.description;
      list.innerHTML = content.items.map((item) => `<li>${item}</li>`).join("");
    });
  });
}

function initPricingToggle() {
  const toggles = document.querySelectorAll("[data-price-mode]");
  const prices = document.querySelectorAll("[data-price]");
  if (!toggles.length || !prices.length) return;

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const mode = toggle.dataset.priceMode;
      toggles.forEach((item) => item.classList.toggle("is-active", item === toggle));
      prices.forEach((price) => {
        const nextValue = price.dataset[mode];
        if (nextValue) {
          price.textContent = nextValue;
        }
      });
    });
  });
}

function initLeadForm() {
  const form = document.querySelector("[data-lead-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.reset();
    if (status) {
      status.textContent = "Application draft received. This demo keeps the form local.";
      status.classList.add("is-success");
    }
  });
}

function initParallax() {
  const heroImage = document.querySelector(".hero-bg");
  if (!heroImage || prefersReducedMotion) return;

  window.addEventListener(
    "scroll",
    () => {
      const offset = Math.min(window.scrollY * 0.08, 36);
      heroImage.style.transform = `scale(1.04) translateY(${offset}px)`;
    },
    { passive: true }
  );
}

function initCinemaReel() {
  const reel = document.querySelector("[data-cinema-reel]");
  if (!reel) return;

  const scenes = Array.from(reel.querySelectorAll("[data-reel-scene]"));
  const count = reel.querySelector("[data-reel-count]");
  const title = reel.querySelector("[data-reel-title]");
  const text = reel.querySelector("[data-reel-text]");

  const copy = [
    {
      title: "Money OS opens the frame.",
      text:
        "Start with a calm, cinematic map of income, debt, runway, and the next decision that matters.",
    },
    {
      title: "Risk becomes visible.",
      text:
        "See emergency funds, volatility, and trade-offs move as one scene instead of a spreadsheet maze.",
    },
    {
      title: "Markets shift color.",
      text:
        "Learn to read noise, incentives, and signal without chasing every headline.",
    },
    {
      title: "The plan gets defended.",
      text:
        "Finish with a clear financial operating system you can explain in a real room.",
    },
  ];

  function setActiveScene(index) {
    scenes.forEach((scene, sceneIndex) => {
      scene.classList.toggle("is-active", sceneIndex === index);
    });

    const accent = scenes[index]?.dataset.accent || "#d7b46a";
    reel.style.setProperty("--cinema-accent", accent);
    if (count) count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
    if (title) title.textContent = copy[index].title;
    if (text) text.textContent = copy[index].text;
  }

  function updateReel() {
    const rect = reel.getBoundingClientRect();
    const scrollable = Math.max(reel.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    const activeIndex = Math.min(scenes.length - 1, Math.round(progress * (scenes.length - 1)));
    reel.style.setProperty("--cinema-progress", progress.toFixed(4));
    setActiveScene(activeIndex);
  }

  setActiveScene(0);
  updateReel();
  window.addEventListener("scroll", updateReel, { passive: true });
  window.addEventListener("resize", updateReel);
}

function initShotSlider() {
  const slider = document.querySelector("[data-shot-slider]");
  if (!slider) return;

  const cards = Array.from(slider.querySelectorAll(".shot-card"));
  const previous = slider.querySelector("[data-shot-prev]");
  const next = slider.querySelector("[data-shot-next]");
  const indexLabel = slider.querySelector("[data-shot-index]");
  let activeIndex = 0;

  function setSlide(index) {
    activeIndex = (index + cards.length) % cards.length;
    slider.style.setProperty("--shot-index", activeIndex);
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("is-active", cardIndex === activeIndex);
    });
    if (indexLabel) {
      indexLabel.textContent = String(activeIndex + 1).padStart(2, "0");
    }
  }

  previous?.addEventListener("click", () => setSlide(activeIndex - 1));
  next?.addEventListener("click", () => setSlide(activeIndex + 1));

  cards.forEach((card, index) => {
    card.addEventListener("click", () => setSlide(index));
  });

  setSlide(0);
}

initReveal();
initTrackSwitcher();
initPricingToggle();
initLeadForm();
initParallax();
initCinemaReel();
initShotSlider();
