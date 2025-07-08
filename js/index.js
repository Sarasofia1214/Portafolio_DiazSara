let currentLanguage = localStorage.getItem("language") || "es"

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

function updateTexts() {
  const t = translations[currentLanguage]

  // Login screen
  const loginTitle = document.getElementById("loginTitle")
  const loginButtonText = document.getElementById("loginButtonText")
  const usernameInput = document.getElementById("usernameInput")
  const passwordInput = document.getElementById("passwordInput")
  const portfolioInfo = document.getElementById("portfolioInfo")
  const feature1 = document.getElementById("feature1")
  const feature2 = document.getElementById("feature2")
  const feature3 = document.getElementById("feature3")
  const currentLang = document.getElementById("currentLang")

  if (loginTitle) loginTitle.textContent = t.welcome
  if (loginButtonText) loginButtonText.textContent = t.loginButton
  if (usernameInput) usernameInput.placeholder = t.username
  if (passwordInput) passwordInput.placeholder = t.password
  if (portfolioInfo) portfolioInfo.textContent = t.portfolioInfo
  if (feature1) feature1.textContent = t.feature1
  if (feature2) feature2.textContent = t.feature2
  if (feature3) feature3.textContent = t.feature3
  if (currentLang) currentLang.textContent = currentLanguage.toUpperCase()

  // Desktop
  const startButtonText = document.getElementById("startButtonText")
  const workLabel = document.getElementById("workLabel")
  const githubLabel = document.getElementById("githubLabel")
  const educationLabel = document.getElementById("educationLabel")
  const skillsLabel = document.getElementById("skillsLabel")
  const contactLabel = document.getElementById("contactLabel")
  const photosLabel = document.getElementById("photosLabel")
  const musicLabel = document.getElementById("musicLabel")
  const languageLabel = document.getElementById("languageLabel")
  const trashLabel = document.getElementById("trashLabel")

  if (startButtonText) startButtonText.textContent = t.startButton
  if (workLabel) workLabel.textContent = t.workLabel
  if (githubLabel) githubLabel.textContent = t.githubLabel
  if (educationLabel) educationLabel.textContent = t.educationLabel
  if (skillsLabel) skillsLabel.textContent = t.skillsLabel
  if (contactLabel) contactLabel.textContent = t.contactLabel
  if (photosLabel) photosLabel.textContent = t.photosLabel
  if (musicLabel) musicLabel.textContent = t.musicLabel
  if (languageLabel) languageLabel.textContent = t.languageLabel
  if (trashLabel) trashLabel.textContent = t.trashLabel
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "es" ? "en" : "es"
  localStorage.setItem("language", currentLanguage)
  updateTexts()
  startTypingAnimation()
}

function updateClock() {
  const now = new Date()
  const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const dateString = now.toLocaleDateString()

  const timeElement = document.getElementById("currentTime")
  const dateElement = document.getElementById("currentDate")

  if (timeElement) timeElement.textContent = timeString
  if (dateElement) dateElement.textContent = dateString
}

function startTypingAnimation() {
  const typingElement = document.getElementById("typingText")
  if (!typingElement) return

  const text = translations[currentLanguage].loadingText
  let i = 0
  typingElement.textContent = ""

  const timer = setInterval(() => {
    if (i < text.length) {
      typingElement.textContent += text.charAt(i)
      i++
    } else {
      clearInterval(timer)
    }
  }, 100)
}

function showDesktop() {
  document.getElementById("loginScreen").classList.remove("active")
  document.getElementById("desktopScreen").classList.add("active")
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

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  updateTexts()
  startTypingAnimation()
  updateClock()
  setInterval(updateClock, 1000)
  addFloatingEffects()

  // Event listeners
  const loginButton = document.getElementById("loginButton")
  if (loginButton) {
    loginButton.addEventListener("click", showDesktop)
  }
})
