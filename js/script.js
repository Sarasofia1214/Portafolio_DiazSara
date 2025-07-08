// Variables y funciones compartidas
let currentLanguage = localStorage.getItem("language") || "es"
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

const translations = {
  es: {
    welcome: "Bienvenido a John Doe OS 🌈",
    loginButton: "Entrar al Escritorio ✨",
    loadingText: "Cargando escritorio mágico... ✨",
    username: "Nombre de usuario",
    password: "Contraseña mágica ✨",
    portfolioInfo: "✨ Portfolio Mágico de Desarrollador ✨",
    feature1: "🎨 Diseño Kawaii",
    feature2: "🚀 Interactivo",
    feature3: "🌈 Colorido",
    startButton: "🌟 Inicio",
    workLabel: "Experiencia Laboral",
    githubLabel: "Mis Proyectos",
    educationLabel: "Educación",
    skillsLabel: "Habilidades",
    contactLabel: "Contáctame",
    photosLabel: "Galería de Fotos",
    musicLabel: "Música Favorita",
    languageLabel: "Idioma",
    trashLabel: "Papelera",
  },
  en: {
    welcome: "Welcome to John Doe OS 🌈",
    loginButton: "Enter Desktop ✨",
    loadingText: "Loading magical desktop... ✨",
    username: "Username",
    password: "Magic password ✨",
    portfolioInfo: "✨ Magical Developer Portfolio ✨",
    feature1: "🎨 Kawaii Design",
    feature2: "🚀 Interactive",
    feature3: "🌈 Colorful",
    startButton: "🌟 Start",
    workLabel: "Work Experience",
    githubLabel: "My Projects",
    educationLabel: "Education",
    skillsLabel: "Skills",
    contactLabel: "Contact Me",
    photosLabel: "Photo Gallery",
    musicLabel: "Favorite Music",
    languageLabel: "Language",
    trashLabel: "Recycle Bin",
  },
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "es" ? "en" : "es"
  localStorage.setItem("language", currentLanguage)
  updateTexts()
  updateDesktopLinks()

  // Update login button href if on login page
  const updateLoginButtonHref = window.updateLoginButtonHref || (() => {})
  updateLoginButtonHref()

  // Start typing animation if on login page
  const startTypingAnimation = window.startTypingAnimation || (() => {})
  startTypingAnimation()
}

function updateDesktopLinks() {
  document.querySelectorAll(".desktop-link").forEach((link) => {
    const href = link.getAttribute("data-href")
    if (href) {
      link.href = `${href}?lang=${currentLanguage}`
    }
  })
}

function addFloatingEffects() {
  setInterval(() => {
    if (Math.random() < 0.1) {
      const emojis = ["✨", "🌟", "⭐", "💫", "🌈", "💖", "🦄"]
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
      addFloatingElement(randomEmoji)
    }
  }, 2000)
}

function addFloatingElement(emoji, duration = 3000) {
  const element = document.createElement("div")
  element.textContent = emoji
  element.style.position = "fixed"
  element.style.fontSize = "24px"
  element.style.pointerEvents = "none"
  element.style.zIndex = "100"
  element.style.left = Math.random() * window.innerWidth + "px"
  element.style.top = window.innerHeight + "px"
  element.style.transition = `all ${duration}ms ease-out`
  document.body.appendChild(element)

  setTimeout(() => {
    element.style.transform = "translateY(-" + (window.innerHeight + 100) + "px)"
    element.style.opacity = "0"
  }, 100)

  setTimeout(() => {
    if (element.parentNode) {
      element.remove()
    }
  }, duration)
}

// Inicializar idioma desde URL
function initializeLanguage() {
  const urlParams = new URLSearchParams(window.location.search)
  const langParam = urlParams.get("lang")
  if (langParam) {
    currentLanguage = langParam
    localStorage.setItem("language", currentLanguage)
  }
}

// Función para actualizar los textos en la página
function updateTexts() {
  const elements = document.querySelectorAll("[data-lang]")
  elements.forEach((element) => {
    const key = element.getAttribute("data-lang")
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key]
    }
  })
}
