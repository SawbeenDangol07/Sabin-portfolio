// Initialize AOS (Animate On Scroll)
AOS.init({
    once: true,
    offset: 50,
    duration: 800,
    easing: 'ease-out-cubic',
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Navigation Toggle & Drawer Controls
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const icon = mobileMenuBtn.querySelector('i');

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('menu-open');
    mobileMenu.classList.toggle('menu-open');
    mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
    
    if (!isOpen) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        document.body.classList.add('overflow-hidden'); // Prevent background scrolling
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        document.body.classList.remove('overflow-hidden');
    }
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('menu-open')) {
            toggleMenu();
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// Active Navbar Link Highlight (Scrollspy)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-accent', 'font-semibold');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('text-accent', 'font-semibold');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Glassmorphic Project Details Modal Logic
const projectModal = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalCategory = document.getElementById('modal-category');
const modalImageContainer = document.getElementById('modal-image-container');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalFeatures = document.getElementById('modal-features');
const modalTags = document.getElementById('modal-tags');
const modalOpenLink = document.getElementById('modal-open-link');
const modalDemoLink = document.getElementById('modal-demo-link');
const modalGithubLink = document.getElementById('modal-github-link');

// Function to open modal with project data
function openProjectModal(card) {
    const title = card.dataset.title || 'Project Details';
    const subtitle = card.dataset.subtitle || '';
    const category = card.dataset.category || 'Project';
    const image = card.dataset.image || '';
    const fullDesc = card.dataset.fullDesc || card.dataset.description || '';
    const githubUrl = card.dataset.github || '';
    const demoUrl = card.dataset.demo || '';
    
    let features = [];
    try {
        if (card.dataset.features) {
            features = JSON.parse(card.dataset.features);
        }
    } catch (e) {
        console.error("Error parsing features data:", e);
    }

    let tags = [];
    try {
        if (card.dataset.tags) {
            tags = JSON.parse(card.dataset.tags);
        }
    } catch (e) {
        console.error("Error parsing tags data:", e);
    }

    // Populate modal content
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    modalCategory.querySelector('span').textContent = category;
    modalDescription.textContent = fullDesc;

    // Handle Modal Links
    const hasDemo = demoUrl && demoUrl !== '#';
    const hasGithub = githubUrl && githubUrl !== '#';

    if (modalDemoLink && modalGithubLink) {
        if (hasDemo) {
            modalDemoLink.href = demoUrl;
            modalDemoLink.classList.remove('hidden');
        } else {
            modalDemoLink.classList.add('hidden');
        }

        if (hasGithub) {
            modalGithubLink.href = githubUrl;
            modalGithubLink.classList.remove('hidden');
        } else {
            modalGithubLink.classList.add('hidden');
        }

        if (modalOpenLink) modalOpenLink.classList.add('hidden');
    } else if (modalOpenLink) {
        modalOpenLink.href = hasDemo ? demoUrl : (hasGithub ? githubUrl : '#');
        modalOpenLink.classList.remove('hidden');
    }

    // Handle Banner Image
    if (image) {
        modalImage.src = image;
        modalImage.alt = title;
        modalImageContainer.classList.remove('hidden');
    } else {
        modalImageContainer.classList.add('hidden');
    }

    // Render Features
    modalFeatures.innerHTML = '';
    if (features && features.length > 0) {
        features.forEach(feat => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-2.5 leading-relaxed';
            li.innerHTML = `<span class="text-accent text-sm mt-0.5">•</span><span>${feat}</span>`;
            modalFeatures.appendChild(li);
        });
        modalFeatures.parentElement.classList.remove('hidden');
    } else {
        modalFeatures.parentElement.classList.add('hidden');
    }

    // Render Tags
    modalTags.innerHTML = '';
    if (tags && tags.length > 0) {
        tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'px-3 py-1.5 bg-bgMain border border-white/10 rounded-xl font-mono text-xs text-emerald-400 font-medium';
            span.textContent = tag;
            modalTags.appendChild(span);
        });
    }

    // Show modal with animation
    projectModal.classList.add('modal-active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
}

// Function to close modal
function closeProjectModal() {
    projectModal.classList.remove('modal-active');
    projectModal.setAttribute('aria-hidden', 'true');
    
    // Only remove overflow-hidden if mobile menu is not active
    if (!mobileMenu.classList.contains('menu-open')) {
        document.body.classList.remove('overflow-hidden');
    }
}

// Attach event listeners to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Don't open modal if direct card-link icons (like GitHub or external link) were clicked
        if (e.target.closest('.card-link')) {
            return;
        }
        openProjectModal(card);
    });
});

// Modal close event listeners
if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

// Close on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('modal-active')) {
        closeProjectModal();
    }
});

