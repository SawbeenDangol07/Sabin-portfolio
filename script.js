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
