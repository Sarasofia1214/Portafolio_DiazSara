// =========================================
// VARIABLES GLOBALES Y CONFIGURACIÓN
// =========================================

// Variables globales unificadas
let currentLanguage = localStorage.getItem("language") || "es";
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let isMenuOpen = false;

// Textos en diferentes idiomas (unificados y completos)
const translations = {
    es: {
        // Textos del menú de inicio
        userTitle: "Desarrolladora de Software",
        restartLabel: "Reiniciar",
        restartDesc: "Volver a la pantalla de inicio",
        languageLabel: "Idioma",
        languageDesc: "Español",
        
        startButton: "Iniciar",
        workLabel: "Experiencia Laboral",
        githubLabel: "Github",
        icon_text: "Perfil",
        skillsLabel: "Habilidades",
        contactLabel: "Contacto",
    
    },
    en: {
        // Textos del menú de inicio
        userTitle: "Software Developer",
        restartLabel: "Restart",
        restartDesc: "Back to start screen",
        languageLabel: "Language",
        languageDesc: "English",
        startButton: "Start",
        workLabel: "Work Experience",
        githubLabel: "Github",
        educationLabel: "Education",
        skillsLabel: "Skills",
        contactLabel: "Contact",
       
  
    }
};

// =========================================
// INICIALIZACIÓN DEL SISTEMA
// =========================================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeStartMenu();
    initializeDarkMode();
    initializeClock(); // Agregar inicialización del reloj
    updateTexts();
    updateDesktopLinks();

});

// =========================================
// FUNCIONES DE INICIALIZACIÓN
// =========================================

function initializeLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    if (langParam && translations[langParam]) {
        currentLanguage = langParam;
        localStorage.setItem("language", currentLanguage);
    }
    
    // Actualizar opción activa del selector de idioma
    updateLanguageSelector();
}

function initializeStartMenu() {
    // Obtener elementos del DOM de forma segura
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    const overlay = document.getElementById('overlay');
    const restartBtn = document.getElementById('restartBtn');
    const languageBtn = document.getElementById('languageBtn');
    const languageSelector = document.getElementById('languageSelector');
    const darkModeBtn = document.getElementById('darkModeBtn');

    // Verificar que los elementos existen antes de agregar event listeners
    if (startButton && startMenu && overlay) {
        // Toggle menú de inicio
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleStartMenu();
        });

        overlay.addEventListener('click', () => {
            closeStartMenu();
        });
    }

    // Función para reiniciar
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            handleRestart();
        });
    }

    // Selector de idioma
    if (languageBtn && languageSelector) {
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageSelector.classList.toggle('show');
        });

        // Agregar listeners a las opciones de idioma
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.dataset.lang;
                if (lang && translations[lang]) {
                    changeLanguage(lang);
                    
                    // Actualizar selección activa
                    updateLanguageSelector();
                    
                    languageSelector.classList.remove('show');
                }
            });
        });
    }

    // Modo oscuro
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            toggleDarkMode();
        });
    }

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (startMenu && startButton && 
            !startMenu.contains(e.target) && 
            !startButton.contains(e.target)) {
            closeStartMenu();
        }
    });

    // Cerrar selector de idioma al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (languageBtn && !languageBtn.contains(e.target)) {
            const languageSelector = document.getElementById('languageSelector');
            if (languageSelector) {
                languageSelector.classList.remove('show');
            }
        }
    });
}

function initializeDarkMode() {
    // Cargar modo oscuro guardado
    const savedDarkMode = localStorage.getItem('darkMode');
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (savedDarkMode === 'true') {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.classList.add('active');
        }
    }
}

// Función para inicializar el reloj
function initializeClock() {
    updateClock();
    setInterval(updateClock, 1000); // Actualizar cada segundo
}

// Función para actualizar el reloj
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');
    
    if (timeElement) {
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
    
    if (dateElement) {
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        dateElement.textContent = `${day}/${month}/${year}`;
    }
}

// =========================================
// FUNCIONES DEL MENÚ DE INICIO
// =========================================

function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const overlay = document.getElementById('overlay');
    const startButton = document.getElementById('startButton');
    const languageSelector = document.getElementById('languageSelector');

    if (!startMenu || !overlay || !startButton) return;

    isMenuOpen = !isMenuOpen;
    startMenu.classList.toggle('show', isMenuOpen);
    overlay.classList.toggle('show', isMenuOpen);
    startButton.classList.toggle('active', isMenuOpen);
    
    // Cerrar selector de idioma si está abierto
    if (languageSelector) {
        languageSelector.classList.remove('show');
    }
}

function closeStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const overlay = document.getElementById('overlay');
    const startButton = document.getElementById('startButton');
    const languageSelector = document.getElementById('languageSelector');

    if (!startMenu || !overlay || !startButton) return;

    isMenuOpen = false;
    startMenu.classList.remove('show');
    overlay.classList.remove('show');
    startButton.classList.remove('active');
    
    if (languageSelector) {
        languageSelector.classList.remove('show');
    }
}

function handleRestart() {
    const body = document.body;
    
    // Efecto de transición
    body.style.transition = 'all 0.5s ease';
    body.style.opacity = '0';
    body.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        // Verificar si existe index.html, si no, recargar página actual
        const indexPath = window.location.pathname.includes('index.html') ? 
            window.location.href : 
            window.location.origin + '/index.html';
        
        // Intentar ir a index.html, si falla recargar la página
        try {
            window.location.href = indexPath;
        } catch (error) {
            window.location.reload();
        }
    }, 500);
}

// =========================================
// FUNCIONES DE IDIOMA
// =========================================

function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem("language", currentLanguage);
    
    updateTexts();
    updateDesktopLinks();
    updateDynamicContent();
    
    // Actualizar atributo lang del HTML
    document.documentElement.lang = lang;
    
    // Llamar funciones específicas de página si existen
    if (typeof window.updateLoginButtonHref === 'function') {
        window.updateLoginButtonHref();
    }
    
    if (typeof window.startTypingAnimation === 'function') {
        window.startTypingAnimation();
    }
}

function toggleLanguage() {
    const newLanguage = currentLanguage === "es" ? "en" : "es";
    changeLanguage(newLanguage);
}

function updateLanguageSelector() {
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.lang === currentLanguage) {
            option.classList.add('active');
        }
    });
}

function updateTexts() {
    const elements = document.querySelectorAll("[data-lang]");
    const texts = translations[currentLanguage];
    
    elements.forEach((element) => {
        const key = element.getAttribute("data-lang");
        if (texts[key]) {
            element.textContent = texts[key];
        }
    });
    
    // Actualizar textos específicos que no tienen data-lang
    updateSpecificTexts();
}

function updateSpecificTexts() {
    const texts = translations[currentLanguage];
    
    // Actualizar iconos del escritorio
    const iconTexts = document.querySelectorAll('.icon_text');
    iconTexts.forEach(iconText => {
        const parentClass = iconText.parentElement.parentElement.className;
        if (parentClass.includes('experiencia')) {
            iconText.textContent = texts.workLabel;
        } else if (parentClass.includes('git')) {
            iconText.textContent = texts.githubLabel;
        } else if (parentText.includes('habilidades')) {
            iconText.textContent = texts.skillsLabel;
        } else if (parentClass.includes('contacto')) {
            iconText.textContent = texts.contactLabel;
        }
    });
    
    // Actualizar botón de inicio
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.textContent = texts.startButton;
    }
    
    // Actualizar label de idioma en el icono del escritorio
    const languageLabel = document.getElementById('languageLabel');
    if (languageLabel) {
        languageLabel.textContent = texts.languageLabel;
    }
}

function updateDesktopLinks() {
    document.querySelectorAll(".desktop-link").forEach((link) => {
        const href = link.getAttribute("data-href");
        if (href) {
            link.href = `${href}?lang=${currentLanguage}`;
        }
    });
}

function updateDynamicContent() {
    // Actualizar contenido dinámico específico
    const userTitle = document.getElementById('userTitle');
    const restartLabel = document.getElementById('restartLabel');
    const restartDesc = document.getElementById('restartDesc');
    const languageMenuLabel = document.getElementById('languageMenuLabel');
    const languageDesc = document.getElementById('languageDesc');
    const darkModeLabel = document.getElementById('darkModeLabel');
    const darkModeDesc = document.getElementById('darkModeDesc');
    
    const texts = translations[currentLanguage];
    
    if (userTitle) userTitle.textContent = texts.userTitle;
    if (restartLabel) restartLabel.textContent = texts.restartLabel;
    if (restartDesc) restartDesc.textContent = texts.restartDesc;
    if (languageMenuLabel) languageMenuLabel.textContent = texts.languageLabel;
    if (languageDesc) languageDesc.textContent = texts.languageDesc;
    if (darkModeLabel) darkModeLabel.textContent = texts.darkModeLabel;
    if (darkModeDesc) darkModeDesc.textContent = texts.darkModeDesc;
}

function toggleDarkMode() {
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    body.classList.toggle('dark-mode');
    
    if (darkModeToggle) {
        darkModeToggle.classList.toggle('active');
    }
    
    // Guardar estado
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function addFloatingEffects() {
    // Efectos flotantes pueden ser agregados aquí
    setInterval(() => {
        if (Math.random() < 0.1) {
            const emojis = ['✨', '🌟', '💫', '⭐'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            addFloatingElement(randomEmoji);
        }
    }, 2000);
}

function addFloatingElement(emoji, duration = 3000) {
    const element = document.createElement("div");
    element.textContent = emoji;
    element.style.position = "fixed";
    element.style.fontSize = "24px";
    element.style.pointerEvents = "none";
    element.style.zIndex = "100";
    element.style.left = Math.random() * window.innerWidth + "px";
    element.style.top = window.innerHeight + "px";
    element.style.transition = `all ${duration}ms ease-out`;
    document.body.appendChild(element);

    setTimeout(() => {
        element.style.transform = "translateY(-" + (window.innerHeight + 100) + "px)";
        element.style.opacity = "0";
    }, 100);

    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, duration);
}

// =========================================
// FUNCIONES DE UTILIDAD
// =========================================

// Función para obtener el idioma actual
function getCurrentLanguage() {
    return currentLanguage;
}

// Función para obtener las traducciones
function getTranslations() {
    return translations;
}

// Función para verificar si es móvil
function checkIsMobile() {
    return isMobile;
}

// Exportar funciones para uso global
window.johnDoeOS = {
    getCurrentLanguage,
    getTranslations,
    checkIsMobile,
    toggleLanguage,
    changeLanguage,
    updateTexts,
    updateDesktopLinks,
    toggleDarkMode,
    addFloatingElement
};