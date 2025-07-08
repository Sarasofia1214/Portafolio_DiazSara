let translations = {} // Declare translations variable
let currentLanguage = "en" // Declare currentLanguage variable

function updateTexts() {
  const t = translations[currentLanguage]

  // Login screen elements
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
}

function setupEventListeners() {
  // Login button
  const loginButton = document.getElementById("loginButton")
  if (loginButton) {
    loginButton.addEventListener("click", showDesktop)
  }

  // Prevent zoom on mobile
  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    },
    { passive: false },
  )
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
  // Redirigir al escritorio con el idioma actual
  window.location.href = `desktop.html?lang=${currentLanguage}`
}

function initializeLanguage() {
  // Initialize language logic here
  translations = {
    en: {
      welcome: "Welcome",
      loginButton: "Login",
      username: "Username",
      password: "Password",
      portfolioInfo: "Portfolio Info",
      feature1: "Feature 1",
      feature2: "Feature 2",
      feature3: "Feature 3",
      loadingText: "Loading...",
    },
    es: {
      welcome: "Bienvenido",
      loginButton: "Iniciar sesión",
      username: "Nombre de usuario",
      password: "Contraseña",
      portfolioInfo: "Información del portafolio",
      feature1: "Característica 1",
      feature2: "Característica 2",
      feature3: "Característica 3",
      loadingText: "Cargando...",
    },
    // Add more languages as needed
  }
  currentLanguage = "en" // Default language
}

function updateDesktopLinks() {
  // Update desktop links logic here
  const links = document.querySelectorAll(".desktop-link")
  links.forEach((link) => {
    link.href += `?lang=${currentLanguage}`
  })
}

function addFloatingEffects() {
  // Add floating effects logic here
  const elements = document.querySelectorAll(".float")
  elements.forEach((element) => {
    element.style.transition = "transform 0.5s ease-in-out"
    element.addEventListener("mouseover", () => {
      element.style.transform = "translateY(-10px)"
    })
    element.addEventListener("mouseout", () => {
      element.style.transform = "translateY(0)"
    })
  })
}

function initializeLoginApp() {
  initializeLanguage()
  updateTexts()
  setupEventListeners()
  updateDesktopLinks()
  startTypingAnimation()
  addFloatingEffects()
}

document.addEventListener("DOMContentLoaded", initializeLoginApp)
