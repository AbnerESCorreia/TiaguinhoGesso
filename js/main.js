document.addEventListener("DOMContentLoaded", () => {
  initThemeControl();
  initScrollAnimations();
  initHeroFeatures();
  initServiceAnimations();
  initCollapseLogic();
  initBackToTop();
  initNavbarInteraction();
});

// --- CONTROLE DE TEMA (DARK MODE) ---
function initThemeControl() {
  const toggleButton = document.getElementById("darkModeToggle");
  const htmlElement = document.documentElement;
  const modeIcon = document.getElementById("modeIcon");

  const setMode = (mode) => {
    htmlElement.setAttribute("data-bs-theme", mode);
    localStorage.setItem("theme", mode);

    if (modeIcon) {
      const isDark = mode === "dark";
      modeIcon.className = isDark ? "bi bi-moon-stars-fill" : "bi bi-sun-fill";
      modeIcon.style.transform = isDark ? "rotate(360deg)" : "rotate(0deg)";
    }
  };

  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  setMode(savedTheme);

  toggleButton?.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    setMode(currentTheme === "light" ? "dark" : "light");
  });
}

// --- ANIMAÇÕES DE SURGIMENTO (SCROLL) ---
function initScrollAnimations() {
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-animated");
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((el) => scrollObserver.observe(el));
}

// --- HERO: CARROSSEL E CONTADORES ---
function initHeroFeatures() {
  const heroCarousel = document.querySelector("#heroCarousel");
  if (heroCarousel) {
    new bootstrap.Carousel(heroCarousel, {
      interval: 5000,
      ride: "carousel",
      pause: false,
    });
  }

  const counters = document.querySelectorAll(".counter");
  const startCounters = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const updateCount = () => {
        const count = +counter.innerText.replace("+", "");
        const inc = target / 130;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = "+" + target;
        }
      };
      updateCount();
    });
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        counterObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  const heroSection = document.querySelector("#hero");
  if (heroSection && counters.length > 0) counterObserver.observe(heroSection);
}

// --- SERVIÇOS: EFEITO DE DIGITAÇÃO ---
function initServiceAnimations() {
  document.querySelectorAll(".card-servico").forEach((card) => {
    let typingInterval;
    const titleElement = card.querySelector(".typing-text");
    const fullText = titleElement?.getAttribute("data-text");

    card.addEventListener("mouseenter", () => {
      if (!titleElement || !fullText) return;
      clearInterval(typingInterval);
      titleElement.textContent = "";
      let i = 0;
      typingInterval = setInterval(() => {
        if (i < fullText.length) {
          titleElement.textContent += fullText.charAt(i++);
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    });

    card.addEventListener("mouseleave", () => {
      clearInterval(typingInterval);
      if (titleElement) titleElement.textContent = "";
    });
  });
}

// --- LÓGICA DE COLLAPSE (SERVIÇOS) ---
function initCollapseLogic() {
  const collapses = document.querySelectorAll(".multi-collapse");

  collapses.forEach((collapse) => {
    collapse.addEventListener("show.bs.collapse", () => {
      collapses.forEach((other) => {
        if (other !== collapse) {
          const instance = bootstrap.Collapse.getInstance(other);
          if (instance) instance.hide();
        }
      });
    });

    collapse.addEventListener("shown.bs.collapse", function () {
      if (window.innerWidth < 992) {
        this.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });
}

// --- BOTÃO VOLTAR AO TOPO ---
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 400 ? "block" : "none";
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// --- NAVBAR: ÍCONE DO MENU MOBILE ---
function initNavbarInteraction() {
  const menuIcon = document.getElementById("menuIcon");
  const navbar = document.getElementById("navbarNav");

  if (!menuIcon || !navbar) return;

  navbar.addEventListener("show.bs.collapse", () => {
    menuIcon.classList.replace("bi-three-dots-vertical", "bi-x");
  });

  navbar.addEventListener("hide.bs.collapse", () => {
    menuIcon.classList.replace("bi-x", "bi-three-dots-vertical");
  });

  // --- LÓGICA DO PRELOADER ---
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    // Adiciona um pequeno delay de 900ms para o usuário ver a marca
    setTimeout(() => {
      preloader.classList.add("loader-hidden");

      // Remove do DOM após a transição para não interferir nos cliques
      setTimeout(() => {
        preloader.style.display = "none";
      }, 900);
    }, 900);
  });
}
