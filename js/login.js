let currentLanguage = localStorage.getItem("language") || "es";
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
let languageButtonRef = null;

document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    addLanguageToggle();
});

function setLanguage(lang) {
    if (!translations[lang]) return;

    currentLanguage = lang;
    localStorage.setItem("language", currentLanguage);
    document.documentElement.lang = currentLanguage;

    updateTexts();
    updateDesktopLink();
    updateLanguageButtonLabel(); 
}

function initializeLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get("lang");

    const langToUse = (langParam && translations[langParam]) ? langParam : currentLanguage;
    setLanguage(langToUse);
}

function changeLanguage(lang) {
    setLanguage(lang);
}
function toggleLanguage() {
    const newLanguage = currentLanguage === "es" ? "en" : "es";
    setLanguage(newLanguage);
}

function updateTexts() {
    const texts = translations[currentLanguage];
    document.title = texts.title;
    const workplaceText = document.querySelector('.login_bienvenida_text');
    if (workplaceText) workplaceText.textContent = texts.workplace;
    const loadingText = document.querySelector('.text');
    if (loadingText) loadingText.textContent = texts.loadingText;
    const accessButton = document.querySelector('.entrar_login a');
    if (accessButton) accessButton.textContent = texts.accessButton;
    const tagline = document.querySelector('.text2');
    if (tagline) tagline.textContent = texts.tagline;
}
function updateDesktopLink() {
    const desktopLink = document.querySelector('.entrar_login a');
    if (desktopLink) {
        const baseHref = './index/desk.html';
        desktopLink.href = `${baseHref}?lang=${currentLanguage}`;
    }
}

function updateLanguageButtonLabel() {
    if (!languageButtonRef) return;
    const willSwitchTo = currentLanguage === 'es' ? 'en' : 'es';
    languageButtonRef.innerHTML = willSwitchTo === 'en' ? 'English' : 'Español';
    languageButtonRef.title = willSwitchTo === 'en' ? 'Switch to English' : 'Cambiar a Español';
}

function addLanguageToggle() {
    const btn = document.createElement('button');
    languageButtonRef = btn; 
    updateLanguageButtonLabel();
    btn.className = 'language-toggle';
    btn.addEventListener('click', toggleLanguage);

    document.body.appendChild(btn);
}
