// Script para páginas individuales
let currentLanguage = "es"

// Textos en diferentes idiomas para páginas
const pageTexts = {
  es: {
    start: {
      title: "🌟 Menú de Inicio 🌟",
      portfolioSection: "📁 Portfolio",
      systemSection: "⚙️ Sistema",
      work: "Trabajo",
      workDesc: "Experiencia profesional",
      projects: "Proyectos",
      projectsDesc: "Mis creaciones",
      education: "Educación",
      educationDesc: "Formación académica",
      skills: "Habilidades",
      skillsDesc: "Tecnologías y skills",
      contact: "Contacto",
      contactDesc: "Información de contacto",
      language: "Idioma: Español",
      languageDesc: "Cambiar idioma",
      settings: "Configuración",
      settingsDesc: "Ajustes del sistema",
      shutdown: "Apagar",
      shutdownDesc: "Cerrar sesión",
      magicalDeveloper: "Desarrollador Mágico",
    },
    work: {
      title: "✨ Experiencia Laboral ✨",
      job1Title: "Desarrollador Frontend Senior",
      job1Company: "Magical Tech Co • 2022 - Presente",
      job1Description:
        "Creando experiencias de usuario encantadoras con React, Next.js, y una pizca de creatividad! ✨ Lidero equipos de desarrollo y implemento soluciones innovadoras para aplicaciones web modernas.",
      job2Title: "Desarrollador Junior",
      job2Company: "Dream Startup • 2020 - 2022",
      job2Description:
        "Construí aplicaciones web responsivas y aprendí la magia del código! Participé en el desarrollo de múltiples proyectos y adquirí experiencia en tecnologías frontend y backend.",
    },
    projects: {
      title: "✨ Mis Proyectos ✨",
      sectionTitle: "Proyectos Destacados",
      project1Title: "Plataforma E-commerce",
      project1Description: "Tienda online completa con carrito de compras y pagos",
      project2Title: "Sitio Web Portfolio",
      project2Description: "Portfolio personal con diseño kawaii y animaciones",
      project3Title: "Aplicación Móvil",
      project3Description: "App móvil para gestión de tareas con sincronización",
      project4Title: "Dashboard Analytics",
      project4Description: "Panel de control con gráficos interactivos",
    },
    education: {
      title: "✨ Educación ✨",
      degreeTitle: "Licenciatura en Ciencias de la Computación",
      degreeUniversity: "Universidad Mágica • 2016 - 2020",
      degreeDescription:
        "Licenciatura con enfoque en desarrollo de software y algoritmos. Participé en proyectos de investigación y obtuve reconocimientos académicos por excelencia en programación.",
      certificationsTitle: "Certificaciones",
    },
    skills: {
      title: "✨ Habilidades ✨",
      technicalTitle: "Habilidades Técnicas",
      softTitle: "Habilidades Blandas",
      react: "React",
      nextjs: "Next.js",
      typescript: "TypeScript",
      nodejs: "Node.js",
      python: "Python",
      aws: "AWS",
      leadership: "Liderazgo",
      communication: "Comunicación",
      problemSolving: "Resolución de Problemas",
      teamwork: "Trabajo en Equipo",
      expert: "Experto",
      advanced: "Avanzado",
      intermediate: "Intermedio",
    },
    contact: {
      title: "✨ Contáctame ✨",
      sectionTitle: "¡Ponte en Contacto!",
      email: "Email",
      linkedin: "LinkedIn",
      location: "Ubicación",
      phone: "Teléfono",
      locationValue: "Dreamland, Cloud City",
    },
  },
  en: {
    start: {
      title: "🌟 Start Menu 🌟",
      portfolioSection: "📁 Portfolio",
      systemSection: "⚙️ System",
      work: "Work",
      workDesc: "Professional experience",
      projects: "Projects",
      projectsDesc: "My creations",
      education: "Education",
      educationDesc: "Academic background",
      skills: "Skills",
      skillsDesc: "Technologies and skills",
      contact: "Contact",
      contactDesc: "Contact information",
      language: "Language: English",
      languageDesc: "Change language",
      settings: "Settings",
      settingsDesc: "System settings",
      shutdown: "Shut Down",
      shutdownDesc: "Log out",
      magicalDeveloper: "Magical Developer",
    },
    work: {
      title: "✨ Work Experience ✨",
      job1Title: "Senior Frontend Developer",
      job1Company: "Magical Tech Co • 2022 - Present",
      job1Description:
        "Creating enchanting user experiences with React, Next.js, and a sprinkle of creativity! ✨ Leading development teams and implementing innovative solutions for modern web applications.",
      job2Title: "Junior Developer",
      job2Company: "Dream Startup • 2020 - 2022",
      job2Description:
        "Built responsive web applications and learned the magic of code! Participated in multiple project developments and gained experience in frontend and backend technologies.",
    },
    projects: {
      title: "✨ My Projects ✨",
      sectionTitle: "Featured Projects",
      project1Title: "E-commerce Platform",
      project1Description: "Complete online store with shopping cart and payments",
      project2Title: "Portfolio Website",
      project2Description: "Personal portfolio with kawaii design and animations",
      project3Title: "Mobile Application",
      project3Description: "Mobile app for task management with synchronization",
      project4Title: "Analytics Dashboard",
      project4Description: "Control panel with interactive charts",
    },
    education: {
      title: "✨ Education ✨",
      degreeTitle: "Computer Science Degree",
      degreeUniversity: "Magic University • 2016 - 2020",
      degreeDescription:
        "Bachelor's degree with focus on software development and algorithms. Participated in research projects and received academic recognition for excellence in programming.",
      certificationsTitle: "Certifications",
    },
    skills: {
      title: "✨ Skills ✨",
      technicalTitle: "Technical Skills",
      softTitle: "Soft Skills",
      react: "React",
      nextjs: "Next.js",
      typescript: "TypeScript",
      nodejs: "Node.js",
      python: "Python",
      aws: "AWS",
      leadership: "Leadership",
      communication: "Communication",
      problemSolving: "Problem Solving",
      teamwork: "Team Work",
      expert: "Expert",
      advanced: "Advanced",
      intermediate: "Intermediate",
    },
    contact: {
      title: "✨ Contact Me ✨",
      sectionTitle: "Get in Touch!",
      email: "Email",
      linkedin: "LinkedIn",
      location: "Location",
      phone: "Phone",
      locationValue: "Dreamland, Cloud City",
    },
  },
}

// Inicialización de la página
document.addEventListener("DOMContentLoaded", () => {
  initializePage()
  addPageTransition()
})

function initializePage() {
  // Obtener idioma de la URL o localStorage
  const urlParams = new URLSearchParams(window.location.search)
  currentLanguage = urlParams.get("lang") || localStorage.getItem("language") || "es"

  // Actualizar textos de la página
  updatePageTexts()

  // Configurar event listeners específicos de la página
  setupPageEventListeners()

  // Actualizar enlaces con idioma
  updatePageLinks()

  // Actualizar reloj si existe
  updateClock()
  setInterval(updateClock, 1000)

  // Agregar transición de entrada
  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)

  // Agregar efectos flotantes
  addFloatingEffects()
}

function setupPageEventListeners() {
  const pageName = getPageName()

  if (pageName === "start") {
    // Cambio de idioma desde el menú de inicio
    const languageMenuItem = document.querySelector(".language-menu-item")
    if (languageMenuItem) {
      languageMenuItem.addEventListener("click", toggleLanguage)
    }

    // Apagar sistema
    const shutdownItem = document.querySelector(".shutdown-item")
    if (shutdownItem) {
      shutdownItem.addEventListener("click", shutdownSystem)
    }
  }
}

function updatePageLinks() {
  // Actualizar todos los enlaces con el parámetro de idioma
  document.querySelectorAll(".desktop-link").forEach((link) => {
    const href = link.getAttribute("data-href")
    if (href) {
      link.href = `${href}?lang=${currentLanguage}`
    }
  })
}

function updatePageTexts() {
  const pageName = getPageName()
  const texts = pageTexts[currentLanguage][pageName]

  if (!texts) return

  // Actualizar título de la ventana
  const windowTitle = document.getElementById("windowTitle")
  if (windowTitle && texts.title) {
    windowTitle.textContent = texts.title
  }

  // Actualizar contenido específico según la página
  updateSpecificContent(pageName, texts)
}

function getPageName() {
  const path = window.location.pathname
  if (path.includes("start.html")) return "start"
  if (path.includes("work.html")) return "work"
  if (path.includes("projects.html")) return "projects"
  if (path.includes("education.html")) return "education"
  if (path.includes("skills.html")) return "skills"
  if (path.includes("contact.html")) return "contact"
  return "work" // default
}

function updateSpecificContent(pageName, texts) {
  switch (pageName) {
    case "start":
      updateStartContent(texts)
      break
    case "work":
      updateWorkContent(texts)
      break
    case "projects":
      updateProjectsContent(texts)
      break
    case "education":
      updateEducationContent(texts)
      break
    case "skills":
      updateSkillsContent(texts)
      break
    case "contact":
      updateContactContent(texts)
      break
  }
}

function updateStartContent(texts) {
  // Actualizar títulos de secciones
  const portfolioTitle = document.getElementById("portfolioSectionTitle")
  const systemTitle = document.getElementById("systemSectionTitle")
  const userTitle = document.getElementById("userTitle")

  if (portfolioTitle) portfolioTitle.textContent = texts.portfolioSection
  if (systemTitle) systemTitle.textContent = texts.systemSection
  if (userTitle) userTitle.textContent = texts.magicalDeveloper

  // Actualizar elementos del menú
  const menuElements = {
    menuWork: texts.work,
    menuWorkDesc: texts.workDesc,
    menuProjects: texts.projects,
    menuProjectsDesc: texts.projectsDesc,
    menuEducation: texts.education,
    menuEducationDesc: texts.educationDesc,
    menuSkills: texts.skills,
    menuSkillsDesc: texts.skillsDesc,
    menuContact: texts.contact,
    menuContactDesc: texts.contactDesc,
    menuLanguage: texts.language,
    menuLanguageDesc: texts.languageDesc,
    menuSettings: texts.settings,
    menuSettingsDesc: texts.settingsDesc,
    menuShutdown: texts.shutdown,
    menuShutdownDesc: texts.shutdownDesc,
  }

  Object.keys(menuElements).forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
      element.textContent = menuElements[id]
    }
  })
}

function updateWorkContent(texts) {
  const elements = document.querySelectorAll("#workContent .section-title")
  const descriptions = document.querySelectorAll("#workContent .section-description")
  const subtitles = document.querySelectorAll("#workContent .section-subtitle")

  if (elements[0]) elements[0].textContent = texts.job1Title
  if (elements[1]) elements[1].textContent = texts.job2Title
  if (subtitles[0]) subtitles[0].textContent = texts.job1Company
  if (subtitles[1]) subtitles[1].textContent = texts.job2Company
  if (descriptions[0]) descriptions[0].textContent = texts.job1Description
  if (descriptions[1]) descriptions[1].textContent = texts.job2Description
}

function updateProjectsContent(texts) {
  const sectionTitle = document.querySelector("#projectsContent .section-title")
  const projectTitles = document.querySelectorAll(".project-title")
  const projectDescriptions = document.querySelectorAll(".project-description")

  if (sectionTitle) sectionTitle.textContent = texts.sectionTitle
  if (projectTitles[0]) projectTitles[0].textContent = texts.project1Title
  if (projectTitles[1]) projectTitles[1].textContent = texts.project2Title
  if (projectTitles[2]) projectTitles[2].textContent = texts.project3Title
  if (projectTitles[3]) projectTitles[3].textContent = texts.project4Title
  if (projectDescriptions[0]) projectDescriptions[0].textContent = texts.project1Description
  if (projectDescriptions[1]) projectDescriptions[1].textContent = texts.project2Description
  if (projectDescriptions[2]) projectDescriptions[2].textContent = texts.project3Description
  if (projectDescriptions[3]) projectDescriptions[3].textContent = texts.project4Description
}

function updateEducationContent(texts) {
  const degreeTitle = document.querySelector("#educationContent .section-title")
  const degreeSubtitle = document.querySelector("#educationContent .section-subtitle")
  const degreeDescription = document.querySelector("#educationContent .section-description")
  const certificationsTitle = document.querySelectorAll("#educationContent .section-title")[1]

  if (degreeTitle) degreeTitle.textContent = texts.degreeTitle
  if (degreeSubtitle) degreeSubtitle.textContent = texts.degreeUniversity
  if (degreeDescription) degreeDescription.textContent = texts.degreeDescription
  if (certificationsTitle) certificationsTitle.textContent = texts.certificationsTitle
}

function updateSkillsContent(texts) {
  const sectionTitles = document.querySelectorAll("#skillsContent .section-title")
  const skillNames = document.querySelectorAll(".skill-name")
  const skillLevels = document.querySelectorAll(".skill-level")

  if (sectionTitles[0]) sectionTitles[0].textContent = texts.technicalTitle
  if (sectionTitles[1]) sectionTitles[1].textContent = texts.softTitle

  // Actualizar nombres de habilidades técnicas
  if (skillNames[0]) skillNames[0].textContent = texts.react
  if (skillNames[1]) skillNames[1].textContent = texts.nextjs
  if (skillNames[2]) skillNames[2].textContent = texts.typescript
  if (skillNames[3]) skillNames[3].textContent = texts.nodejs
  if (skillNames[4]) skillNames[4].textContent = texts.python
  if (skillNames[5]) skillNames[5].textContent = texts.aws

  // Actualizar nombres de habilidades blandas
  if (skillNames[6]) skillNames[6].textContent = texts.leadership
  if (skillNames[7]) skillNames[7].textContent = texts.communication
  if (skillNames[8]) skillNames[8].textContent = texts.problemSolving
  if (skillNames[9]) skillNames[9].textContent = texts.teamwork

  // Actualizar niveles
  if (skillLevels[0]) skillLevels[0].textContent = texts.expert
  if (skillLevels[1]) skillLevels[1].textContent = texts.advanced
  if (skillLevels[2]) skillLevels[2].textContent = texts.advanced
  if (skillLevels[3]) skillLevels[3].textContent = texts.intermediate
  if (skillLevels[4]) skillLevels[4].textContent = texts.intermediate
  if (skillLevels[5]) skillLevels[5].textContent = texts.intermediate
}

function updateContactContent(texts) {
  const sectionTitle = document.querySelector("#contactContent .section-title")
  const contactTitles = document.querySelectorAll(".contact-title")
  const locationInfo = document.querySelectorAll(".contact-info")[2]

  if (sectionTitle) sectionTitle.textContent = texts.sectionTitle
  if (contactTitles[0]) contactTitles[0].textContent = texts.email
  if (contactTitles[1]) contactTitles[1].textContent = texts.linkedin
  if (contactTitles[2]) contactTitles[2].textContent = texts.location
  if (contactTitles[3]) contactTitles[3].textContent = texts.phone
  if (locationInfo) locationInfo.textContent = texts.locationValue
}

function addPageTransition() {
  // Agregar transición suave al cargar la página
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.3s ease"
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "es" ? "en" : "es"
  localStorage.setItem("language", currentLanguage)
  updatePageTexts()
  updatePageLinks()
}

function shutdownSystem() {
  // Transición de salida
  document.body.style.opacity = "0"

  setTimeout(() => {
    // Volver al index (pantalla de login)
    window.location.href = `index.html?lang=${currentLanguage}`
  }, 300)
}

function goBackToDesktop() {
  // Transición de salida
  document.body.style.opacity = "0"

  setTimeout(() => {
    // Volver al escritorio
    window.location.href = `index.html?lang=${currentLanguage}#desktop`
  }, 300)
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

// Agregar efectos especiales ocasionales
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

// Efectos especiales ocasionales
function addFloatingEffects() {
  setInterval(() => {
    if (Math.random() < 0.1) {
      const emojis = ["✨", "🌟", "⭐", "💫", "🌈", "💖", "🦄"]
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]
      addFloatingElement(randomEmoji)
    }
  }, 2000)
}
