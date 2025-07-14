
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
        workLabel: "Experiencia Laboral",
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
        workLabel: "Work Experience",
        githubLabel: "Github",
        educationLabel: "Education",
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

function initializeStartMenu() {
    const startButton = document.getElementById('startButton');
    const startMenu = document.getElementById('startMenu');
    const overlay = document.getElementById('overlay');
    const restartBtn = document.getElementById('restartBtn');
    const languageBtn = document.getElementById('languageBtn');
    const languageSelector = document.getElementById('languageSelector');

   
    if (startButton && startMenu && overlay) {

        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleStartMenu();
        });

        overlay.addEventListener('click', () => {
            closeStartMenu();
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            handleRestart();
        });
    }

    if (languageBtn && languageSelector) {
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageSelector.classList.toggle('show');
        });


        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.dataset.lang;
                if (lang && translations[lang]) {
                    changeLanguage(lang);
                    
                    updateLanguageSelector();
                    
                    languageSelector.classList.remove('show');
                }
            });
        });
    }


    document.addEventListener('click', (e) => {
        if (startMenu && startButton && 
            !startMenu.contains(e.target) && 
            !startButton.contains(e.target)) {
            closeStartMenu();
        }
    });

    document.addEventListener('click', (e) => {
        if (languageBtn && !languageBtn.contains(e.target)) {
            const languageSelector = document.getElementById('languageSelector');
            if (languageSelector) {
                languageSelector.classList.remove('show');
            }
        }
    });
}

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
    
    body.style.transition = 'all 0.5s ease';
    body.style.opacity = '0';
    body.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        const indexPath = window.location.pathname.includes('index.html') ? 
            window.location.href : 
            window.location.origin + '/index.html';
        
        try {
            window.location.href = indexPath;
        } catch (error) {
            window.location.reload();
        }
    }, 500);
}

function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    localStorage.setItem("language", currentLanguage);
    
    updateTexts();
    updateDesktopLinks();
    updateDynamicContent();
    

    document.documentElement.lang = lang;

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
    

    updateSpecificTexts();
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
        } else if (parentText.includes('habilidades')) {
            iconText.textContent = texts.skillsLabel;
        } else if (parentClass.includes('contacto')) {
            iconText.textContent = texts.contactLabel;
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
            link.href = `${href}?lang=${currentLanguage}`;
        }
    });
}

function updateDynamicContent() {
 
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
    getCurrentLanguage,
    getTranslations,
    checkIsMobile,
    toggleLanguage,
    changeLanguage,
    updateTexts,
    updateDesktopLinks,

};