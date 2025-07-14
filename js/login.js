// =========================================
// VARIABLES Y CONFIGURACIÓN DE IDIOMA
// =========================================

let currentLanguage = localStorage.getItem("language") || "es";

// Textos en diferentes idiomas
const translations = {
    es: {
        title: "Portafolio",
        workplace: "Sara's worksplace",
        loadingText: "Cargando Escritorio Mágico ...",
        accessButton: "Acceder",
        tagline: "Aprendizaje | Pasión | Conexión"
    },
    en: {
        title: "Portfolio",
        workplace: "Sara's worksplace",
        loadingText: "Loading Magical Desktop ...",
        accessButton: "Access",
        tagline: "Learning | Passion | Connection"
    }
};

// =========================================
// INICIALIZACIÓN
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    updateTexts();
    updateDesktopLink();
    addLanguageToggle();
});

// =========================================
// FUNCIONES DE IDIOMA
// =========================================

function initializeLanguage() {
    // Verificar si hay un parámetro de idioma en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");
    
    if (langParam && translations[langParam]) {
        currentLanguage = langParam;
        localStorage.setItem("language", currentLanguage);
    }
    
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = currentLanguage;
}

function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem("language", currentLanguage);
    
    updateTexts();
    updateDesktopLink();
    
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = currentLanguage;
}

function toggleLanguage() {
    const newLanguage = currentLanguage === "es" ? "en" : "es";
    changeLanguage(newLanguage);
}

function updateTexts() {
    const texts = translations[currentLanguage];
    
    // Actualizar título de la página
    document.title = texts.title;
    
    // Actualizar texto de bienvenida
    const workplaceText = document.querySelector('.login_bienvenida_text');
    if (workplaceText) {
        workplaceText.textContent = texts.workplace;
    }
    
    // Actualizar texto de carga
    const loadingText = document.querySelector('.text');
    if (loadingText) {
        loadingText.textContent = texts.loadingText;
    }
    
    // Actualizar botón de acceso
    const accessButton = document.querySelector('.entrar_login a');
    if (accessButton) {
        accessButton.textContent = texts.accessButton;
    }
    
    // Actualizar tagline
    const tagline = document.querySelector('.text2');
    if (tagline) {
        tagline.textContent = texts.tagline;
    }
}

function updateDesktopLink() {
    // Actualizar el enlace del escritorio para incluir el parámetro de idioma
    const desktopLink = document.querySelector('.entrar_login a');
    if (desktopLink) {
        const baseHref = './index/desk.html';
        desktopLink.href = `${baseHref}?lang=${currentLanguage}`;
    }
}

function addLanguageToggle() {
    // Crear botón de cambio de idioma
    const languageButton = document.createElement('button');
    languageButton.innerHTML = currentLanguage === 'es' ? '🇺🇸 EN' : '🇪🇸 ES';
    languageButton.className = 'language-toggle';
    languageButton.title = currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a Español';
    
    // Estilos inline para el botón
    Object.assign(languageButton.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 255, 255, 0.9)',
        border: 'none',
        borderRadius: '20px',
        padding: '8px 12px',
        fontSize: '14px',
        cursor: 'pointer',
        zIndex: '1000',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
        fontWeight: 'bold'
    });
    
    // Efectos hover
    languageButton.addEventListener('mouseenter', () => {
        languageButton.style.transform = 'scale(1.1)';
        languageButton.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    });
    
    languageButton.addEventListener('mouseleave', () => {
        languageButton.style.transform = 'scale(1)';
        languageButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
    
    // Agregar evento de clic
    languageButton.addEventListener('click', () => {
        toggleLanguage();
        // Actualizar texto del botón
        languageButton.innerHTML = currentLanguage === 'es' ? '🇺🇸 EN' : '🇪🇸 ES';
        languageButton.title = currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a Español';
    });
    
    // Agregar al DOM
    document.body.appendChild(languageButton);
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

// Exportar funciones para uso global
window.loginPage = {
    getCurrentLanguage,
    getTranslations,
    toggleLanguage,
    changeLanguage
};