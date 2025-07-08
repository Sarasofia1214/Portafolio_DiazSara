// Declare necessary variables and functions
let translations = {} // Placeholder for translations object
let currentLanguage = "en" // Default language
let isMobile = false // Placeholder for mobile detection

function toggleLanguage() {
  // Placeholder for language toggle logic
  currentLanguage = currentLanguage === "en" ? "es" : "en"
  updateTexts()
}

function initializeLanguage() {
  // Placeholder for language initialization logic
  translations = {
    en: {
      startButton: "Start",
      workLabel: "Work",
      githubLabel: "GitHub",
      educationLabel: "Education",
      skillsLabel: "Skills",
      contactLabel: "Contact",
      photosLabel: "Photos",
      musicLabel: "Music",
      languageLabel: "Language",
      trashLabel: "Trash",
    },
    es: {
      startButton: "Iniciar",
      workLabel: "Trabajo",
      githubLabel: "GitHub",
      educationLabel: "Educación",
      skillsLabel: "Habilidades",
      contactLabel: "Contacto",
      photosLabel: "Fotos",
      musicLabel: "Música",
      languageLabel: "Idioma",
      trashLabel: "Basura",
    },
  }
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function updateTexts() {
  const t = translations[currentLanguage]

  // Desktop elements
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

function setupEventListeners() {
  // Language icon
  const languageIcon = document.querySelector(".language-icon")
  if (languageIcon) {
    languageIcon.addEventListener("dblclick", toggleLanguage)
    if (isMobile) {
      languageIcon.addEventListener("click", toggleLanguage)
    }
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

function updateClock() {
  const now = new Date()
  const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const dateString = now.toLocaleDateString()

  const timeElement = document.getElementById("currentTime")
  const dateElement = document.getElementById("currentDate")

  if (timeElement) timeElement.textContent = timeString
  if (dateElement) dateElement.textContent = dateString
}

function updateDesktopLinks() {
  // Placeholder for updating desktop links logic
}

function addFloatingEffects() {
  // Placeholder for adding floating effects logic
}

function initializeDesktopApp() {
  initializeLanguage()
  updateTexts()
  setupEventListeners()
  updateDesktopLinks()
  updateClock()
  setInterval(updateClock, 1000)
  addFloatingEffects()
}

document.addEventListener("DOMContentLoaded", initializeDesktopApp)
