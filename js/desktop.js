let currentLanguage = localStorage.getItem("language") || "es";
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let isMenuOpen = false;

const translations = {
    es: {
        userTitle: "Desarrolladora de Software",
        restartLabel: "Reiniciar",
        restartDesc: "Volver a la pantalla de inicio",
        languageLabel: "Idioma",
        languageDesc: "Español",
        
        startButton: "Iniciar",
        workLabel: "Proyectos",
        githubLabel: "Github",
        icon_text: "Perfil",
        skillsLabel: "Habilidades",
        contactLabel: "Contacto",
    },
    en: {
        userTitle: "Software Developer",
        restartLabel: "Restart",
        restartDesc: "Back to start screen",
        languageLabel: "Language",
        languageDesc: "English",
        startButton: "Start",
        workLabel: "Projects",
        githubLabel: "Github",
        icon_text: "Profile", 
        skillsLabel: "Skills",
        contactLabel: "Contact",
    }
};


document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeStartMenu();
    initializeClock(); 
    updateTexts(); 
    updateDesktopLinks();
    updateDynamicContent(); 
});


function initializeLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    if (langParam && translations[langParam]) {
        currentLanguage = langParam;
        localStorage.setItem("language", currentLanguage);
    }
    updateLanguageSelector();
}

function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem("language", currentLanguage);
    
    updateTexts();
    updateDesktopLinks();
    updateDynamicContent(); // Llama a esta función para actualizar los textos del menú de inicio y otros.
    
    document.documentElement.lang = lang;

    // Asegurarse de que estas funciones existan si se van a llamar
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
    updateSpecificTexts(); // Llama a esta función para actualizar textos que no usan data-lang directamente.
}

function updateSpecificTexts() {
    const texts = translations[currentLanguage];

    const iconTexts = document.querySelectorAll('.icon_text');
    iconTexts.forEach(iconText => {
        const parentClass = iconText.parentElement.parentElement.className;
        if (parentClass.includes('experiencia')) {
            iconText.textContent = texts.workLabel;
        } else if (parentClass.includes('git')) {
            iconText.textContent = texts.githubLabel;
        } else if (parentClass.includes('habilidades')) { // Corregido: 'parentClass' en lugar de 'parentText'
            iconText.textContent = texts.skillsLabel;
        } else if (parentClass.includes('contacto')) {
            iconText.textContent = texts.contactLabel;
        } else if (parentClass.includes('perfil')) { // Agregado para el texto del ícono de perfil
            iconText.textContent = texts.icon_text;
        }
    });
    
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.textContent = texts.startButton;
    }
    
    const languageLabel = document.getElementById('languageLabel');
    if (languageLabel) {
        languageLabel.textContent = texts.languageLabel;
    }
}

function updateDesktopLinks() {
    document.querySelectorAll(".desktop-link").forEach((link) => {
        const href = link.getAttribute("data-href");
        if (href) {
            // Asegura que los enlaces pasen el parámetro de idioma
            link.href = `${href}?lang=${currentLanguage}`;
        }
    });
}

function updateDynamicContent() {
    // Esta función actualiza los textos específicos del menú de inicio
    const userTitle = document.getElementById('userTitle');
    const restartLabel = document.getElementById('restartLabel');
    const restartDesc = document.getElementById('restartDesc');
    const languageMenuLabel = document.getElementById('languageMenuLabel');
    const languageDesc = document.getElementById('languageDesc');

    const texts = translations[currentLanguage];
    
    if (userTitle) userTitle.textContent = texts.userTitle;
    if (restartLabel) restartLabel.textContent = texts.restartLabel;
    if (restartDesc) restartDesc.textContent = texts.restartDesc;
    if (languageMenuLabel) languageMenuLabel.textContent = texts.languageLabel;
    if (languageDesc) languageDesc.textContent = texts.languageDesc;
}


// --- Funciones del Menú de Inicio ---

function initializeStartMenu() {
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    const overlay = document.getElementById('overlay');
    const restartBtn = document.getElementById('restartBtn');
    const languageBtn = document.getElementById('languageBtn');
    const languageSelector = document.getElementById('languageSelector');

    if (startButton && startMenu && overlay) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague al documento
            toggleStartMenu();
        });

        overlay.addEventListener('click', () => {
            closeStartMenu();
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            handleRestart(); // Llamada a la función de reinicio
        });
    }

    if (languageBtn && languageSelector) {
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague al documento
            languageSelector.classList.toggle('show');
        });

        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que el clic se propague
                const lang = option.dataset.lang;
                if (lang && translations[lang]) {
                    changeLanguage(lang);
                    updateLanguageSelector(); // Actualiza el estado visual del selector
                    languageSelector.classList.remove('show'); // Cierra el selector
                }
            });
        });
    }

    // Cerrar el menú de inicio si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (startMenu && startButton && 
            !startMenu.contains(e.target) && 
            !startButton.contains(e.target)) {
            closeStartMenu();
        }
    });

    // Cerrar el selector de idioma si se hace clic fuera del botón o el selector
    document.addEventListener('click', (e) => {
        if (languageBtn && !languageBtn.contains(e.target)) {
            const languageSelector = document.getElementById('languageSelector');
            if (languageSelector && !languageSelector.contains(e.target)) { // Agregado: verificar si el clic no fue dentro del selector
                languageSelector.classList.remove('show');
            }
        }
    });
}

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
    
    if (languageSelector) {
        languageSelector.classList.remove('show'); // Asegura que el selector de idioma se cierre al abrir/cerrar el menú principal
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
        languageSelector.classList.remove('show'); // Asegura que el selector de idioma se cierre
    }
}

// --- Función de Reloj ---

function initializeClock() {
    updateClock();
    setInterval(updateClock, 1000); 
}

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

// --- FUNCIÓN handleRestart() MODIFICADA (OPCIÓN 2) ---
// Esta función ahora navegará directamente a la URL de tu portfolio en GitHub Pages.
function handleRestart() {
    const body = document.body;
    
    // Agrega una transición visual antes de redirigir
    body.style.transition = 'all 0.5s ease';
    body.style.opacity = '0';
    body.style.transform = 'scale(0.95)';
    
    // Espera un poco para que la transición sea visible antes de la redirección
    setTimeout(() => {
        // Redirige a la URL completa de tu página principal de GitHub Pages.
        // Basado en tus capturas, esta es la URL correcta para tu portfolio.
        window.location.href = 'https://sarasofia1214.github.io/Portafolio_DiazSara/index.html';
    }, 500); // Redirige después de 0.5 segundos
}


// --- Funciones Auxiliares y Exposición Global (johnDoeOS) ---

function getCurrentLanguage() {
    return currentLanguage;
}

function getTranslations() {
    return translations;
}

function checkIsMobile() {
    return isMobile;
}

window.johnDoeOS = {
    getCurrentLanguage: getCurrentLanguage,
    getTranslations: getTranslations,
    checkIsMobile: checkIsMobile,
    toggleLanguage: toggleLanguage,
    changeLanguage: changeLanguage,
    updateTexts: updateTexts,
    updateDesktopLinks: updateDesktopLinks,
   
};