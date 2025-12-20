document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("darkModeToggle");
  const htmlElement = document.documentElement;
  const modeIcon = document.getElementById("modeIcon");

  /**
   * --- 1. LÓGICA DE DARK MODE ---
   */
  function setMode(mode) {
    if (mode === "dark") {
      htmlElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
      
      // Troca ícone para LUA
      if (modeIcon) {
        modeIcon.classList.remove("bi-sun-fill");
        modeIcon.classList.add("bi-moon-stars-fill");
        modeIcon.style.transform = "rotate(360deg)";
      }
    } else {
      htmlElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
      
      // Troca ícone para SOL
      if (modeIcon) {
        modeIcon.classList.remove("bi-moon-stars-fill");
        modeIcon.classList.add("bi-sun-fill");
        modeIcon.style.transform = "rotate(0deg)";
      }
    }
  }

  // Inicialização: Carrega tema salvo ou preferência do sistema
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setMode(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setMode(prefersDark ? "dark" : "light");
  }

  // Evento de Clique no Botão
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-bs-theme");
      setMode(currentTheme === "light" ? "dark" : "light");
    });
  }

  /**
   * --- 2. ANIMAÇÕES AO SCROLL ---
   */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-animated");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));

  /**
   * --- 3. BOTÃO VOLTAR AO TOPO ---
   */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 400 ? "block" : "none";
    });
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /**
   * --- 4. LÓGICA DOS CONTADORES ANIMADOS ---
   */
    const counters = document.querySelectorAll('.counter');
    const speed = 2000;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', '');
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = "+" + target;
                }
            };
            updateCount();
        });
    };

    // Observer para disparar a animação apenas quando chegar na seção
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                counterObserver.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        counterObserver.observe(heroSection);
    }
});

