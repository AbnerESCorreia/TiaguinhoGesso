document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. TEMA (DARK MODE)
    // ==========================================
    const toggleButton = document.getElementById("darkModeToggle");
    const htmlElement = document.documentElement;
    const modeIcon = document.getElementById("modeIcon");

    function setMode(mode) {
        if (mode === "dark") {
            htmlElement.setAttribute("data-bs-theme", "dark");
            localStorage.setItem("theme", "dark");
            if (modeIcon) {
                modeIcon.classList.remove("bi-sun-fill");
                modeIcon.classList.add("bi-moon-stars-fill");
                modeIcon.style.transform = "rotate(360deg)";
            }
        } else {
            htmlElement.setAttribute("data-bs-theme", "light");
            localStorage.setItem("theme", "light");
            if (modeIcon) {
                modeIcon.classList.remove("bi-moon-stars-fill");
                modeIcon.classList.add("bi-sun-fill");
                modeIcon.style.transform = "rotate(0deg)";
            }
        }
    }

    // Inicialização do Tema
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        setMode(savedTheme);
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setMode(prefersDark ? "dark" : "light");
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-bs-theme");
            setMode(currentTheme === "light" ? "dark" : "light");
        });
    }

    // ==========================================
    // 2. ANIMAÇÕES DE SURGIMENTO AO ROLAR (SCROLL)
    // ==========================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-animated");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".animate-on-scroll").forEach((el) => scrollObserver.observe(el));

    // ==========================================
    // 3. CONTADORES NUMÉRICOS (HERO)
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const counterSpeed = 2000;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', '');
                const inc = target / (counterSpeed / 15); // Ajuste fino da fluidez

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

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('#hero');
    if (heroSection) counterObserver.observe(heroSection);

   
    // ==========================================
    // 4. ANIMAÇÃO DE DIGITAÇÃO (SERVIÇOS) - VERSÃO ESTÁVEL
    // ==========================================
    document.querySelectorAll('.card-servico').forEach(card => {
        let typingInterval; // Variável para armazenar o intervalo atual deste card

        card.addEventListener('mouseenter', function() {
            const titleElement = this.querySelector('.typing-text');
            const fullText = titleElement.getAttribute('data-text');
            
            // Limpa qualquer intervalo que ainda esteja rodando para evitar duplicação
            clearInterval(typingInterval);
            
            // Reseta o texto antes de começar
            titleElement.innerText = "";
            
            let i = 0;
            typingInterval = setInterval(() => {
                if (i < fullText.length) {
                    titleElement.innerText += fullText.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50); // Velocidade levemente mais rápida para ser mais fluido
        });

        card.addEventListener('mouseleave', function() {
            // Ao sair, cancela a animação e limpa o texto
            clearInterval(typingInterval);
            this.querySelector('.typing-text').innerText = "";
        });
    });

    // ==========================================
    // 5. LÓGICA DE COLLAPSE (FECHAR ANTERIOR)
    // ==========================================
    const collapses = document.querySelectorAll('.multi-collapse');
    collapses.forEach(collapse => {
        collapse.addEventListener('show.bs.collapse', () => {
            collapses.forEach(other => {
                if (other !== collapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(other);
                    if (bsCollapse) bsCollapse.hide();
                }
            });
        });
    });

    // ==========================================
    // 6. BOTÃO VOLTAR AO TOPO
    // ==========================================
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
});