// Estado global de la aplicación
let currentLanguage = 'es';
let openWindows = [];
let isStartMenuOpen = false;
let isMobile = window.innerWidth <= 768;

// Textos en diferentes idiomas
const texts = {
    es: {
        welcome: "Bienvenido a John Doe OS 🌈",
        enterDesktop: "Entrar al Escritorio ✨",
        start: "🌟 Inicio",
        workExperience: "Experiencia Laboral",
        myProjects: "Mis Proyectos",
        education: "Educación",
        skillsTools: "Habilidades",
        contactMe: "Contáctame",
        photoGallery: "Galería de Fotos",
        favoriteMusic: "Música Favorita",
        language: "Idioma",
        recycleBin: "Papelera",
        settings: "Configuración",
        shutDown: "Apagar",
        magicalDeveloper: "Desarrollador Mágico",
        loadingText: "Cargando escritorio mágico... ✨",
        menuWork: "Trabajo",
        menuProjects: "Proyectos",
        menuEducation: "Educación",
        menuSkills: "Habilidades",
        menuContact: "Contacto",
        menuLanguage: "Idioma: Español"
    },
    en: {
        welcome: "Welcome to John Doe OS 🌈",
        enterDesktop: "Enter Desktop ✨",
        start: "🌟 Start",
        workExperience: "Work Experience",
        myProjects: "My Projects",
        education: "Education",
        skillsTools: "Skills & Tools",
        contactMe: "Contact Me",
        photoGallery: "Photo Gallery",
        favoriteMusic: "Favorite Music",
        language: "Language",
        recycleBin: "Recycle Bin",
        settings: "Settings",
        shutDown: "Shut Down",
        magicalDeveloper: "Magical Developer",
        loadingText: "Loading magical desktop... ✨",
        menuWork: "Work",
        menuProjects: "Projects",
        menuEducation: "Education",
        menuSkills: "Skills",
        menuContact: "Contact",
        menuLanguage: "Language: English"
    }
};

// Contenido de las ventanas (mismo contenido que antes)
const windowContent = {
    es: {
        work: `
            <div class="content-section work-section">
                <div class="section-header">
                    <span class="section-emoji">💼</span>
                    <div>
                        <h2 class="section-title">Desarrollador Frontend Senior</h2>
                        <p class="section-subtitle">Magical Tech Co • 2022 - Presente</p>
                    </div>
                </div>
                <p class="section-description">
                    Creando experiencias de usuario encantadoras con React, Next.js, y una pizca de creatividad! ✨ 
                    Lidero equipos de desarrollo y implemento soluciones innovadoras para aplicaciones web modernas.
                </p>
                <div class="tags">
                    <span class="tag">React</span>
                    <span class="tag">Next.js</span>
                    <span class="tag">TypeScript</span>
                </div>
            </div>
            <div class="content-section work-section">
                <div class="section-header">
                    <span class="section-emoji">🌟</span>
                    <div>
                        <h2 class="section-title">Desarrollador Junior</h2>
                        <p class="section-subtitle">Dream Startup • 2020 - 2022</p>
                    </div>
                </div>
                <p class="section-description">
                    Construí aplicaciones web responsivas y aprendí la magia del código! Participé en el desarrollo 
                    de múltiples proyectos y adquirí experiencia en tecnologías frontend y backend.
                </p>
                <div class="tags">
                    <span class="tag">JavaScript</span>
                    <span class="tag">Vue.js</span>
                    <span class="tag">Node.js</span>
                </div>
            </div>
        `,
        github: `
            <div class="content-section github-section">
                <div class="section-header">
                    <span class="section-emoji">🚀</span>
                    <h2 class="section-title">Proyectos Destacados</h2>
                </div>
                <div class="projects-grid">
                    <div class="project-card">
                        <div class="project-header">
                            <span class="project-emoji">🛍️</span>
                            <div>
                                <h3 class="project-title">Plataforma E-commerce</h3>
                                <span class="project-tech">React + Node.js</span>
                            </div>
                        </div>
                        <p class="project-description">Tienda online completa con carrito de compras y pagos</p>
                    </div>
                    <div class="project-card">
                        <div class="project-header">
                            <span class="project-emoji">🎨</span>
                            <div>
                                <h3 class="project-title">Sitio Web Portfolio</h3>
                                <span class="project-tech">Next.js + Tailwind</span>
                            </div>
                        </div>
                        <p class="project-description">Portfolio personal con diseño kawaii y animaciones</p>
                    </div>
                    <div class="project-card">
                        <div class="project-header">
                            <span class="project-emoji">📱</span>
                            <div>
                                <h3 class="project-title">Aplicación Móvil</h3>
                                <span class="project-tech">React Native</span>
                            </div>
                        </div>
                        <p class="project-description">App móvil para gestión de tareas con sincronización</p>
                    </div>
                    <div class="project-card">
                        <div class="project-header">
                            <span class="project-emoji">📊</span>
                            <div>
                                <h3 class="project-title">Dashboard Analytics</h3>
                                <span class="project-tech">Vue.js + D3.js</span>
                            </div>
                        </div>
                        <p class="project-description">Panel de control con gráficos interactivos</p>
                    </div>
                </div>
            </div>
        `,
        education: `
            <div class="content-section education-section">
                <div class="section-header">
                    <span class="section-emoji">🎓</span>
                    <div>
                        <h2 class="section-title">Licenciatura en Ciencias de la Computación</h2>
                        <p class="section-subtitle">Universidad Mágica • 2016 - 2020</p>
                    </div>
                </div>
                <p class="section-description">
                    Licenciatura con enfoque en desarrollo de software y algoritmos. Participé en proyectos de 
                    investigación y obtuve reconocimientos académicos por excelencia en programación.
                </p>
            </div>
            <div class="content-section education-section">
                <div class="section-header">
                    <span class="section-emoji">📜</span>
                    <h2 class="section-title">Certificaciones</h2>
                </div>
                <div class="contact-grid">
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">⭐</span>
                            <div>
                                <p class="contact-title">AWS Certified Developer</p>
                                <p class="contact-info">Amazon Web Services</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">🌟</span>
                            <div>
                                <p class="contact-title">Google Cloud Professional</p>
                                <p class="contact-info">Google Cloud Platform</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">✨</span>
                            <div>
                                <p class="contact-title">React Advanced Certification</p>
                                <p class="contact-info">Meta (Facebook)</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">💫</span>
                            <div>
                                <p class="contact-title">Scrum Master Certified</p>
                                <p class="contact-info">Scrum Alliance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        skills: `
            <div class="content-section skills-section">
                <div class="section-header">
                    <span class="section-emoji">🛠️</span>
                    <h2 class="section-title">Habilidades Técnicas</h2>
                </div>
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="skill-emoji">⚛️</span>
                        <p class="skill-name">React</p>
                        <span class="skill-level">Experto</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🚀</span>
                        <p class="skill-name">Next.js</p>
                        <span class="skill-level">Avanzado</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">📘</span>
                        <p class="skill-name">TypeScript</p>
                        <span class="skill-level">Avanzado</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🟢</span>
                        <p class="skill-name">Node.js</p>
                        <span class="skill-level">Intermedio</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🐍</span>
                        <p class="skill-name">Python</p>
                        <span class="skill-level">Intermedio</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">☁️</span>
                        <p class="skill-name">AWS</p>
                        <span class="skill-level">Intermedio</span>
                    </div>
                </div>
            </div>
            <div class="content-section skills-section">
                <div class="section-header">
                    <span class="section-emoji">💖</span>
                    <h2 class="section-title">Habilidades Blandas</h2>
                </div>
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="skill-emoji">👑</span>
                        <p class="skill-name">Liderazgo</p>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">💬</span>
                        <p class="skill-name">Comunicación</p>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🧩</span>
                        <p class="skill-name">Resolución de Problemas</p>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🤝</span>
                        <p class="skill-name">Trabajo en Equipo</p>
                    </div>
                </div>
            </div>
        `,
        contact: `
            <div class="content-section contact-section">
                <div class="section-header">
                    <span class="section-emoji">💌</span>
                    <h2 class="section-title">¡Ponte en Contacto!</h2>
                </div>
                <div class="contact-grid">
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">📧</span>
                            <div>
                                <p class="contact-title">Email</p>
                                <p class="contact-info">john.doe@magical-dev.com</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">🔗</span>
                            <div>
                                <p class="contact-title">LinkedIn</p>
                                <p class="contact-info">linkedin.com/in/johndoe</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">🏠</span>
                            <div>
                                <p class="contact-title">Ubicación</p>
                                <p class="contact-info">Dreamland, Cloud City</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">📱</span>
                            <div>
                                <p class="contact-title">Teléfono</p>
                                <p class="contact-info">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    en: {
        work: `
            <div class="content-section work-section">
                <div class="section-header">
                    <span class="section-emoji">💼</span>
                    <div>
                        <h2 class="section-title">Senior Frontend Developer</h2>
                        <p class="section-subtitle">Magical Tech Co • 2022 - Present</p>
                    </div>
                </div>
                <p class="section-description">
                    Creating enchanting user experiences with React, Next.js, and a sprinkle of creativity! ✨ 
                    Leading development teams and implementing innovative solutions for modern web applications.
                </p>
                <div class="tags">
                    <span class="tag">React</span>
                    <span class="tag">Next.js</span>
                    <span class="tag">TypeScript</span>
                </div>
            </div>
            <div class="content-section work-section">
                <div class="section-header">
                    <span class="section-emoji">🌟</span>
                    <div>
                        <h2 class="section-title">Junior Developer</h2>
                        <p class="section-subtitle">Dream Startup • 2020 - 2022</p>
                    </div>
                </div>
                <p class="section-description">
                    Built responsive web applications and learned the magic of code! Participated in multiple 
                    project developments and gained experience in frontend and backend technologies.
                </p>
                <div class="tags">
                    <span class="tag">JavaScript</span>
                    <span class="tag">Vue.js</span>
                    <span class="tag">Node.js</span>
                </div>
            </div>
        `,
        github: `
            <div class="content-section github-section">
                <div class="section-header">
                    <span class="section-emoji">🚀</span>
                    <h2 class="section-title">Featured Projects</h2>
                </div>
                <div class="projects-grid">
                    <div class="project-card">
                        <div class="project-header">
                            <span class="project-emoji">🛍️</span>
                            <div>
                                <h3 class="project-title">E-commerce Platform</h3>
                                <span class="project-tech">React + Node.js</span>
                            </div>
                        </div>
                        <p class="project-description">Complete online store with shopping cart and payments</p>
                    </div>
                    <div class="project-card">
                        <div class="project-header">
                            <span class="project-emoji">🎨</span>
                            <div>
                                <h3 class="project-title">Portfolio Website</h3>
                                <span class="project-tech">Next.js + Tailwind</span>
                            </div>
                        </div>
                        <p class="project-description">Personal portfolio with kawaii design and animations</p>
                    </div>
                    <div class="project-card">
                        <div class="project-header">
                            <span class="project-emoji">📱</span>
                            <div>
                                <h3 class="project-title">Mobile Application</h3>
                                <span class="project-tech">React Native</span>
                            </div>
                        </div>
                        <p class="project-description">Mobile app for task management with synchronization</p>
                    </div>
                    <div class="project-card">
                        <div class="project-header">
                            <span class="project-emoji">📊</span>
                            <div>
                                <h3 class="project-title">Analytics Dashboard</h3>
                                <span class="project-tech">Vue.js + D3.js</span>
                            </div>
                        </div>
                        <p class="project-description">Control panel with interactive charts</p>
                    </div>
                </div>
            </div>
        `,
        education: `
            <div class="content-section education-section">
                <div class="section-header">
                    <span class="section-emoji">🎓</span>
                    <div>
                        <h2 class="section-title">Computer Science Degree</h2>
                        <p class="section-subtitle">Magic University • 2016 - 2020</p>
                    </div>
                </div>
                <p class="section-description">
                    Bachelor's degree with focus on software development and algorithms. Participated in research 
                    projects and received academic recognition for excellence in programming.
                </p>
            </div>
            <div class="content-section education-section">
                <div class="section-header">
                    <span class="section-emoji">📜</span>
                    <h2 class="section-title">Certifications</h2>
                </div>
                <div class="contact-grid">
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">⭐</span>
                            <div>
                                <p class="contact-title">AWS Certified Developer</p>
                                <p class="contact-info">Amazon Web Services</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">🌟</span>
                            <div>
                                <p class="contact-title">Google Cloud Professional</p>
                                <p class="contact-info">Google Cloud Platform</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">✨</span>
                            <div>
                                <p class="contact-title">React Advanced Certification</p>
                                <p class="contact-info">Meta (Facebook)</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">💫</span>
                            <div>
                                <p class="contact-title">Scrum Master Certified</p>
                                <p class="contact-info">Scrum Alliance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        skills: `
            <div class="content-section skills-section">
                <div class="section-header">
                    <span class="section-emoji">🛠️</span>
                    <h2 class="section-title">Technical Skills</h2>
                </div>
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="skill-emoji">⚛️</span>
                        <p class="skill-name">React</p>
                        <span class="skill-level">Expert</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🚀</span>
                        <p class="skill-name">Next.js</p>
                        <span class="skill-level">Advanced</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">📘</span>
                        <p class="skill-name">TypeScript</p>
                        <span class="skill-level">Advanced</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🟢</span>
                        <p class="skill-name">Node.js</p>
                        <span class="skill-level">Intermediate</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🐍</span>
                        <p class="skill-name">Python</p>
                        <span class="skill-level">Intermediate</span>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">☁️</span>
                        <p class="skill-name">AWS</p>
                        <span class="skill-level">Intermediate</span>
                    </div>
                </div>
            </div>
            <div class="content-section skills-section">
                <div class="section-header">
                    <span class="section-emoji">💖</span>
                    <h2 class="section-title">Soft Skills</h2>
                </div>
                <div class="skills-grid">
                    <div class="skill-card">
                        <span class="skill-emoji">👑</span>
                        <p class="skill-name">Leadership</p>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">💬</span>
                        <p class="skill-name">Communication</p>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🧩</span>
                        <p class="skill-name">Problem Solving</p>
                    </div>
                    <div class="skill-card">
                        <span class="skill-emoji">🤝</span>
                        <p class="skill-name">Team Work</p>
                    </div>
                </div>
            </div>
        `,
        contact: `
            <div class="content-section contact-section">
                <div class="section-header">
                    <span class="section-emoji">💌</span>
                    <h2 class="section-title">Get in Touch!</h2>
                </div>
                <div class="contact-grid">
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">📧</span>
                            <div>
                                <p class="contact-title">Email</p>
                                <p class="contact-info">john.doe@magical-dev.com</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">🔗</span>
                            <div>
                                <p class="contact-title">LinkedIn</p>
                                <p class="contact-info">linkedin.com/in/johndoe</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">🏠</span>
                            <div>
                                <p class="contact-title">Location</p>
                                <p class="contact-info">Dreamland, Cloud City</p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-card">
                        <div class="contact-header">
                            <span class="contact-emoji">📱</span>
                            <div>
                                <p class="contact-title">Phone</p>
                                <p class="contact-info">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    handleResize();
});

// Manejar cambios de tamaño de ventana
window.addEventListener('resize', handleResize);

function handleResize() {
    isMobile = window.innerWidth <= 768;
    
    // Reorganizar íconos en móvil
    if (isMobile) {
        reorganizeDesktopIcons();
    }
    
    // Ajustar ventanas abiertas
    adjustOpenWindows();
}

function reorganizeDesktopIcons() {
    const desktopIcons = document.querySelector('.desktop-icons');
    if (window.innerWidth <= 480) {
        desktopIcons.style.display = 'flex';
        desktopIcons.style.flexWrap = 'wrap';
        desktopIcons.style.justifyContent = 'space-around';
        desktopIcons.style.alignContent = 'flex-start';
        
        // Resetear posiciones absolutas
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.style.position = 'static';
            icon.style.margin = '0.5rem';
        });
    } else {
        desktopIcons.style.display = 'block';
        
        // Restaurar posiciones absolutas
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.style.position = 'absolute';
            icon.style.margin = '0';
        });
    }
}

function adjustOpenWindows() {
    // Ajustar el tamaño de las ventanas abiertas según el dispositivo
    document.querySelectorAll('.window').forEach(window => {
        if (isMobile) {
            window.style.top = '0.25rem';
            window.style.left = '0.25rem';
            window.style.right = '0.25rem';
            window.style.bottom = '0.25rem';
        } else {
            window.style.top = '1rem';
            window.style.left = '1rem';
            window.style.right = '1rem';
            window.style.bottom = '1rem';
        }
    });
}

function initializeApp() {
    updateTexts();
    setupEventListeners();
    startTypingAnimation();
    updateClock();
    setInterval(updateClock, 1000);
}

function updateTexts() {
    const t = texts[currentLanguage];
    
    // Actualizar textos del login
    const loginTitle = document.getElementById('loginTitle');
    const loginButtonText = document.getElementById('loginButtonText');
    if (loginTitle) loginTitle.textContent = t.welcome;
    if (loginButtonText) loginButtonText.textContent = t.enterDesktop;
    
    // Actualizar textos del escritorio
    const elements = {
        startButtonText: t.start,
        workLabel: t.workExperience,
        githubLabel: t.myProjects,
        educationLabel: t.education,
        skillsLabel: t.skillsTools,
        contactLabel: t.contactMe,
        photosLabel: t.photoGallery,
        musicLabel: t.favoriteMusic,
        languageLabel: t.language,
        trashLabel: t.recycleBin,
        userTitle: t.magicalDeveloper,
        menuWork: t.menuWork,
        menuProjects: t.menuProjects,
        menuEducation: t.menuEducation,
        menuSkills: t.menuSkills,
        menuContact: t.menuContact,
        menuLanguage: t.menuLanguage,
        menuSettings: t.settings,
        menuShutdown: t.shutDown
    };
    
    // Actualizar todos los elementos
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
}

function setupEventListeners() {
    // Login
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', showDesktop);
    }
    
    // Íconos del escritorio - soporte para doble clic y toque
    document.querySelectorAll('.desktop-icon[data-window]').forEach(icon => {
        let tapCount = 0;
        let tapTimer = null;
        
        // Doble clic para escritorio
        icon.addEventListener('dblclick', function(e) {
            e.preventDefault();
            const windowType = this.getAttribute('data-window');
            openWindow(windowType);
        });
        
        // Soporte táctil para móviles
        icon.addEventListener('touchstart', function(e) {
            tapCount++;
            if (tapCount === 1) {
                tapTimer = setTimeout(() => {
                    tapCount = 0;
                }, 300);
            } else if (tapCount === 2) {
                clearTimeout(tapTimer);
                tapCount = 0;
                e.preventDefault();
                const windowType = this.getAttribute('data-window');
                openWindow(windowType);
            }
        });
        
        // Click simple para móviles como alternativa
        if (isMobile) {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                const windowType = this.getAttribute('data-window');
                openWindow(windowType);
            });
        }
    });
    
    // Ícono de idioma
    const languageIcon = document.querySelector('.language-icon');
    if (languageIcon) {
        languageIcon.addEventListener('dblclick', toggleLanguage);
        if (isMobile) {
            languageIcon.addEventListener('click', toggleLanguage);
        }
    }
    
    // Botón de inicio
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', toggleStartMenu);
    }
    
    // Elementos del menú de inicio
    document.querySelectorAll('.start-menu-item[data-window]').forEach(item => {
        item.addEventListener('click', function() {
            const windowType = this.getAttribute('data-window');
            openWindow(windowType);
            hideStartMenu();
        });
    });
    
    // Cambio de idioma desde el menú
    const languageMenuItem = document.querySelector('.language-menu-item');
    if (languageMenuItem) {
        languageMenuItem.addEventListener('click', toggleLanguage);
    }
    
    // Apagar sistema
    const shutdownItem = document.querySelector('.shutdown-item');
    if (shutdownItem) {
        shutdownItem.addEventListener('click', shutdownSystem);
    }
    
    // Aplicaciones de la barra de tareas
    document.querySelectorAll('.taskbar-app[data-window]').forEach(app => {
        app.addEventListener('click', function() {
            const windowType = this.getAttribute('data-window');
            openWindow(windowType);
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#startButton') && !e.target.closest('#startMenu')) {
            hideStartMenu();
        }
    });
    
    // Prevenir zoom en dispositivos móviles
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Prevenir scroll en el body
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
}

function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const text = texts[currentLanguage].loadingText;
    let index = 0;
    
    typingElement.textContent = '';
    
    function typeChar() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, 100);
        }
    }
    
    typeChar();
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString();
    
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
}

function showDesktop() {
    const loginScreen = document.getElementById('loginScreen');
    const desktopScreen = document.getElementById('desktopScreen');
    
    if (loginScreen) loginScreen.classList.remove('active');
    if (desktopScreen) desktopScreen.classList.add('active');
    
    // Reorganizar íconos si es necesario
    setTimeout(() => {
        if (isMobile) {
            reorganizeDesktopIcons();
        }
    }, 100);
}

function shutdownSystem() {
    // Cerrar todas las ventanas
    openWindows.forEach(windowId => {
        closeWindow(windowId);
    });
    
    // Ocultar menú de inicio
    hideStartMenu();
    
    // Volver al login
    const desktopScreen = document.getElementById('desktopScreen');
    const loginScreen = document.getElementById('loginScreen');
    
    if (desktopScreen) desktopScreen.classList.remove('active');
    if (loginScreen) loginScreen.classList.add('active');
    
    // Reiniciar animación de escritura
    setTimeout(() => {
        startTypingAnimation();
    }, 500);
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    updateTexts();
    startTypingAnimation();
    
    // Actualizar ventanas abiertas
    openWindows.forEach(windowId => {
        const windowElement = document.getElementById(`window-${windowId}`);
        if (windowElement) {
            const contentElement = windowElement.querySelector('.window-content');
            if (contentElement && windowContent[currentLanguage][windowId]) {
                contentElement.innerHTML = windowContent[currentLanguage][windowId];
            }
            
            // Actualizar título de la ventana
            const titleElement = windowElement.querySelector('.window-title');
            if (titleElement) {
                const windowTitle = texts[currentLanguage][windowId === 'github' ? 'myProjects' : 
                                                        windowId === 'work' ? 'workExperience' :
                                                        windowId === 'skills' ? 'skillsTools' :
                                                        windowId === 'contact' ? 'contactMe' : windowId];
                titleElement.textContent = `✨ ${windowTitle} ✨`;
            }
        }
    });
}

function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    if (!startMenu) return;
    
    isStartMenuOpen = !isStartMenuOpen;
    
    if (isStartMenuOpen) {
        startMenu.classList.remove('hidden');
    } else {
        startMenu.classList.add('hidden');
    }
}

function hideStartMenu() {
    const startMenu = document.getElementById('startMenu');
    if (startMenu) {
        startMenu.classList.add('hidden');
    }
    isStartMenuOpen = false;
}

function openWindow(windowType) {
    if (openWindows.includes(windowType)) {
        // Si la ventana ya está abierta, enfocarla
        const existingWindow = document.getElementById(`window-${windowType}`);
        if (existingWindow) {
            existingWindow.style.zIndex = '60';
        }
        return;
    }
    
    openWindows.push(windowType);
    
    const windowContainer = document.getElementById('windowContainer');
    if (!windowContainer) return;
    
    const windowElement = document.createElement('div');
    windowElement.className = 'window';
    windowElement.id = `window-${windowType}`;
    
    const windowTitle = texts[currentLanguage][windowType === 'github' ? 'myProjects' : 
                                            windowType === 'work' ? 'workExperience' :
                                            windowType === 'skills' ? 'skillsTools' :
                                            windowType === 'contact' ? 'contactMe' : windowType];
    
    windowElement.innerHTML = `
        <div class="window-header">
            <div class="window-controls">
                <div class="window-control control-close" onclick="closeWindow('${windowType}')"></div>
                <div class="window-control control-minimize"></div>
                <div class="window-control control-maximize"></div>
            </div>
            <h3 class="window-title">✨ ${windowTitle} ✨</h3>
            <div class="window-actions">
                <button class="window-action">−</button>
                <button class="window-action">□</button>
                <button class="window-action" onclick="closeWindow('${windowType}')">×</button>
            </div>
        </div>
        <div class="window-content">
            ${windowContent[currentLanguage][windowType] || '<p>Contenido no disponible</p>'}
        </div>
    `;
    
    windowContainer.appendChild(windowElement);
    
    // Ajustar tamaño según dispositivo
    adjustOpenWindows();
    
    // Actualizar estado de la barra de tareas
    updateTaskbarState();
}

function closeWindow(windowType) {
    const windowElement = document.getElementById(`window-${windowType}`);
    if (windowElement) {
        windowElement.remove();
    }
    
    openWindows = openWindows.filter(id => id !== windowType);
    updateTaskbarState();
}

function updateTaskbarState() {
    document.querySelectorAll('.taskbar-app').forEach(app => {
        const windowType = app.getAttribute('data-window');
        if (openWindows.includes(windowType)) {
            app.classList.add('active');
        } else {
            app.classList.remove('active');
        }
    });
}

// Funciones de utilidad para efectos adicionales
function addFloatingElement(emoji, duration = 3000) {
    const element = document.createElement('div');
    element.textContent = emoji;
    element.style.position = 'fixed';
    element.style.fontSize = isMobile ? '18px' : '24px';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '100';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.transition = `all ${duration}ms ease-out`;
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.style.transform = 'translateY(-' + (window.innerHeight + 100) + 'px)';
        element.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, duration);
}

// Agregar efectos especiales ocasionales
setInterval(() => {
    if (Math.random() < 0.1) { // 10% de probabilidad cada segundo
        const emojis = ['✨', '🌟', '⭐', '💫', '🌈', '💖', '🦄'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        addFloatingElement(randomEmoji);
    }
}, 1000);

// Función para manejar orientación en móviles
function handleOrientationChange() {
    setTimeout(() => {
        handleResize();
        if (isMobile) {
            reorganizeDesktopIcons();
        }
    }, 100);
}

// Escuchar cambios de orientación
window.addEventListener('orientationchange', handleOrientationChange);

// Prevenir comportamientos por defecto en móviles
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

document.addEventListener('gesturechange', function(e) {
    e.preventDefault();
});

document.addEventListener('gestureend', function(e) {
    e.preventDefault();
});