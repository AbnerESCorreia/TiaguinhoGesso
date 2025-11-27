document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("darkModeToggle");
  const htmlElement = document.querySelector("html");
  const modeIcon = document.getElementById("modeIcon");

  // Função para aplicar o modo
  function setMode(mode) {
    if (mode === "dark") {
      htmlElement.setAttribute("data-bs-theme", "dark");
      modeIcon.classList.remove("bi-sun-fill");
      modeIcon.classList.add("bi-moon-fill");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.setAttribute("data-bs-theme", "light");
      modeIcon.classList.remove("bi-moon-fill");
      modeIcon.classList.add("bi-sun-fill");
      localStorage.setItem("theme", "light");
    }
  }

  // 1. Carregar o tema salvo ou usar o modo claro por padrão
  const savedTheme = localStorage.getItem("theme") || "light";
  setMode(savedTheme);

  // 2. Evento de clique para alternar
  toggleButton.addEventListener("click", function () {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    if (currentTheme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  });

  // 3. Validação do formulário (Exemplo de Bootstrap Validation)
  (function () {
    "use strict";
    var forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();

  // ----------------------------------------------------
  // CÓDIGO PARA ANIMAÇÕES AO SCROLL (Intersection Observer)
  // ESTE BLOCO ESTAVA FORA E FOI TRAZIDO PARA DENTRO
  // ----------------------------------------------------

  const animateOnScrollElements =
    document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null, // Observa a viewport
    rootMargin: "0px", // Nenhuma margem extra
    threshold: 0.2, // Dispara quando 20% do elemento está visível
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Se o elemento está visível, adiciona a classe de animação
        entry.target.classList.add("is-animated");
        // Para a observação após animar (se você quiser que anime apenas uma vez)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observa todos os elementos com a classe 'animate-on-scroll'
  animateOnScrollElements.forEach((element) => {
    observer.observe(element);
  });
});
