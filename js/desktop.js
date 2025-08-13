let currentLanguage = localStorage.getItem("language") || "es";
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

let els = {};

document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    initializeLanguage();
    initializeStartMenu();
    initializeClock();
    updateTexts();
    updateDesktopLinks();
    updateDynamicContent();
});

function cacheElements() {
    els = {
        startButton: document.getElementById('startButton'),
        startMenu: document.getElementById('startMenu'),
        overlay: document.getElementById('overlay'),
        restartBtn: document.getElementById('restartBtn'),
        languageBtn: document.getElementById('languageBtn'),
        languageSelector: document.getElementById('languageSelector'),
        timeElement: document.getElementById('currentTime'),
        dateElement: document.getElementById('currentDate'),
        userTitle: document.getElementById('userTitle'),
        restartLabel: document.getElementById('restartLabel'),
        restartDesc: document.getElementById('restartDesc'),
        languageMenuLabel: document.getElementById('languageMenuLabel'),
        languageDesc: document.getElementById('languageDesc')
    };
}

function setLanguage(lang) {
    if (!translations[lang]) return;

    currentLanguage = lang;
    localStorage.setItem("language", currentLanguage);
    document.documentElement.lang = lang;

    updateTexts();
    updateDesktopLinks();
    updateDynamicContent();
    updateLanguageSelector();

    if (typeof window.updateLoginButtonHref === 'function') {
        window.updateLoginButtonHref();
    }
    if (typeof window.startTypingAnimation === 'function') {
        window.startTypingAnimation();
    }
}

function initializeLanguage() {
    const langParam = new URLSearchParams(window.location.search).get("lang");
    setLanguage(langParam && translations[langParam] ? langParam : currentLanguage);
}

function changeLanguage(lang) {
    setLanguage(lang);
}

function toggleLanguage() {
    setLanguage(currentLanguage === "es" ? "en" : "es");
}

function updateLanguageSelector() {
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === currentLanguage);
    });
}



function updateTexts() {
    const texts = translations[currentLanguage];
    document.querySelectorAll("[data-lang]").forEach(el => {
        const key = el.getAttribute("data-lang");
        if (texts[key]) el.textContent = texts[key];
    });
    updateSpecificTexts();
}

function updateSpecificTexts() {
    const texts = translations[currentLanguage];
    const iconMap = {
        'experiencia': texts.workLabel,
        'git': texts.githubLabel,
        'habilidades': texts.skillsLabel,
        'contacto': texts.contactLabel,
        'perfil': texts.icon_text
    };

    document.querySelectorAll('.icon_text').forEach(iconText => {
        const parentClass = iconText.parentElement.parentElement.className;
        for (const key in iconMap) {
            if (parentClass.includes(key)) {
                iconText.textContent = iconMap[key];
                break;
            }
        }
    });

    if (els.startButton) els.startButton.textContent = texts.startButton;
    const languageLabel = document.getElementById('languageLabel');
    if (languageLabel) languageLabel.textContent = texts.languageLabel;
}

function updateDesktopLinks() {
    document.querySelectorAll(".desktop-link").forEach(link => {
        const href = link.getAttribute("data-href");
        if (href) link.href = `${href}?lang=${currentLanguage}`;
    });
}

function updateDynamicContent() {
    const texts = translations[currentLanguage];
    if (els.userTitle) els.userTitle.textContent = texts.userTitle;
    if (els.restartLabel) els.restartLabel.textContent = texts.restartLabel;
    if (els.restartDesc) els.restartDesc.textContent = texts.restartDesc;
    if (els.languageMenuLabel) els.languageMenuLabel.textContent = texts.languageLabel;
    if (els.languageDesc) els.languageDesc.textContent = texts.languageDesc;
}



function initializeStartMenu() {
    if (els.startButton && els.startMenu && els.overlay) {
        els.startButton.addEventListener('click', e => {
            e.stopPropagation();
            toggleStartMenu();
        });
        els.overlay.addEventListener('click', closeStartMenu);
    }

    if (els.restartBtn) els.restartBtn.addEventListener('click', handleRestart);

    if (els.languageBtn && els.languageSelector) {
        els.languageBtn.addEventListener('click', e => {
            e.stopPropagation();
            els.languageSelector.classList.toggle('show');
        });
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', e => {
                e.stopPropagation();
                changeLanguage(option.dataset.lang);
                els.languageSelector.classList.remove('show');
            });
        });
    }

    document.addEventListener('click', e => {
        if (els.startMenu && els.startButton &&
            !els.startMenu.contains(e.target) &&
            !els.startButton.contains(e.target)) {
            closeStartMenu();
        }
        if (els.languageBtn && !els.languageBtn.contains(e.target) &&
            els.languageSelector && !els.languageSelector.contains(e.target)) {
            els.languageSelector.classList.remove('show');
        }
    });
}

function toggleStartMenu() {
    if (!els.startMenu || !els.overlay || !els.startButton) return;
    isMenuOpen = !isMenuOpen;
    els.startMenu.classList.toggle('show', isMenuOpen);
    els.overlay.classList.toggle('show', isMenuOpen);
    els.startButton.classList.toggle('active', isMenuOpen);
    if (els.languageSelector) els.languageSelector.classList.remove('show');
}

function closeStartMenu() {
    if (!els.startMenu || !els.overlay || !els.startButton) return;
    isMenuOpen = false;
    els.startMenu.classList.remove('show');
    els.overlay.classList.remove('show');
    els.startButton.classList.remove('active');
    if (els.languageSelector) els.languageSelector.classList.remove('show');
}



function initializeClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    if (els.timeElement) {
        els.timeElement.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    if (els.dateElement) {
        els.dateElement.textContent = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    }
}

function handleRestart() {
    document.body.style.transition = 'all 0.5s ease';
    document.body.style.opacity = '0';
    document.body.style.transform = 'scale(0.95)';
    setTimeout(() => {
        window.location.href = 'https://sarasofia1214.github.io/Portafolio_DiazSara/index.html';
    }, 500);
}

