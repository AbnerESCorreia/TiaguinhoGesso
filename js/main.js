document.addEventListener("DOMContentLoaded", () => {
  initThemeControl();
  initScrollAnimations();
  initHeroFeatures();
  initServiceAnimations();
  initCollapseLogic();
  initBackToTop();
  initNavbarInteraction();
  initContactForm(); // Movi a lógica do form para uma função própria por organização
});

// --- CONTROLE DE TEMA (FORÇANDO LIGHT MODE POR PADRÃO) ---
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

  // Alterado: Agora ele verifica o localStorage, se não existir, força "light"
  // Ignoramos a preferência do sistema (prefers-color-scheme) para abrir sempre claro
  const savedTheme = localStorage.getItem("theme") || "light";

  setMode(savedTheme);

  toggleButton?.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    setMode(currentTheme === "light" ? "dark" : "light");
  });
}

// --- ENVIO MENSAGEM WHATSAPP ---
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;
    const btnSubmit = document.getElementById("btnSubmit");

    const texto =
      `*Nova Solicitação de Contato*%0A%0A` +
      `*Nome:* ${nome}%0A` +
      `*Telefone:* ${telefone}%0A` +
      `*Email:* ${email}%0A` +
      `*Mensagem:* ${mensagem}`;

    const seuNumero = "553799578983"; // Número corrigido
    const url = `https://api.whatsapp.com/send?phone=${seuNumero}&text=${texto}`;

    btnSubmit.innerHTML = "ENVIANDO...";
    btnSubmit.disabled = true;

    window.open(url, "_blank");

    setTimeout(() => {
      alert(
        "Obrigado! Sua mensagem foi preparada. Basta clicar em enviar no WhatsApp."
      );
      btnSubmit.innerHTML = "SOLICITAR CONTATO";
      btnSubmit.disabled = false;
      contactForm.reset();

      const modalElement = document.getElementById("contatoModal");
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }, 1000);
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

// --- NAVBAR: ÍCONE DO MENU MOBILE E PRELOADER ---
function initNavbarInteraction() {
  const menuIcon = document.getElementById("menuIcon");
  const navbar = document.getElementById("navbarNav");

  if (menuIcon && navbar) {
    navbar.addEventListener("show.bs.collapse", () => {
      menuIcon.classList.replace("bi-three-dots-vertical", "bi-x");
    });

    navbar.addEventListener("hide.bs.collapse", () => {
      menuIcon.classList.replace("bi-x", "bi-three-dots-vertical");
    });
  }

  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add("loader-hidden");
        setTimeout(() => {
          preloader.style.display = "none";
        }, 900);
      }, 900);
    }
  });
}
