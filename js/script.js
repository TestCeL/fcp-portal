// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Funcionalidad de tabs para la sección de teoría
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remover active de todos los botones y paneles
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Activar el botón y panel correspondiente
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Efecto parallax suave para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroElements = document.querySelectorAll('.hero-content');

        heroElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Animación de aparición para las tarjetas al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.content-card, .experiment-card, .app-card, .ref-category');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Efecto de escritura para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Aplicar efecto de escritura al título principal después de un breve retraso
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 80);
        }
    }, 500);

    // Contador animado para números en las fórmulas
    function animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Navegación activa basada en scroll
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavigation);

    // Efecto de partículas cuánticas mejorado
    function createQuantumParticles() {
        const heroVisual = document.querySelector('.hero-visual');
        if (!heroVisual) return;

        // Crear partículas adicionales
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: hsl(${Math.random() * 360}, 70%, 60%);
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
                animation-delay: ${Math.random() * 2}s;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
            `;
            heroVisual.appendChild(particle);
        }
    }

    // Crear partículas cuánticas después de cargar
    createQuantumParticles();

    // Tooltip para fórmulas matemáticas
    const formulas = document.querySelectorAll('.formula-box, .formula-display, .formula-mini');
    formulas.forEach(formula => {
        formula.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });

        formula.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Búsqueda en tiempo real (si se implementa)
    function setupSearch() {
        const searchInput = document.getElementById('search');
        if (!searchInput) return;

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('.content-card, .experiment-card, .ref-category');

            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(searchTerm) || searchTerm === '') {
                    element.style.display = '';
                    element.style.opacity = '1';
                } else {
                    element.style.display = 'none';
                }
            });
        });
    }

    setupSearch();

    // Copiar enlace de sección al hacer clic en títulos
    const sectionTitles = document.querySelectorAll('h2[id], h3[id]');
    sectionTitles.forEach(title => {
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            const url = window.location.origin + window.location.pathname + '#' + this.id;
            navigator.clipboard.writeText(url).then(() => {
                // Mostrar feedback visual
                const originalText = this.textContent;
                this.textContent = '¡Enlace copiado!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            });
        });
    });

    // Lazy loading para imágenes (cuando se agreguen)
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    setupLazyLoading();

    // Modo oscuro toggle (para futura implementación)
    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (!darkModeToggle) return;

        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Restaurar preferencia
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    setupDarkMode();
});

// Agregar estilos CSS para animaciones adicionales
const additionalStyles = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
        }
    }

    .nav-link.active {
        color: var(--primary-color) !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    .quantum-particle {
        pointer-events: none;
        z-index: 0;
    }

    .hero-content {
        transition: transform 0.1s ease-out;
    }

    .formula-box:hover,
    .formula-display:hover,
    .formula-mini:hover {
        transition: all 0.3s ease;
    }
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);