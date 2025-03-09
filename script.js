// DOM Elements
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const menuIcon = menuToggle.querySelector('i');
const navLinks = document.querySelector('.nav-links');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Prevent blue highlight on touch for interactive elements
function preventTouchHighlight() {
    const interactiveElements = document.querySelectorAll('a, button, .btn, .course-card, .feature-card, .testimonial-card, .tool-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            // This empty handler with passive: true helps prevent the blue highlight
        }, { passive: true });
    });
}

// Advanced Animation Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.course-card, .feature-card, .testimonial-card, .tool-card').forEach(el => {
    observer.observe(el);
});

// Theme toggle functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Menu toggle functionality
function toggleMenu() {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Toggle between bars and times icon with smooth rotation
    if (navLinks.classList.contains('active')) {
        menuIcon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        }, 150);
    } else {
        menuIcon.style.transform = 'rotate(0deg)';
        setTimeout(() => {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }, 150);
    }
}

function closeMenu() {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('menu-open');
    menuIcon.style.transform = 'rotate(0deg)';
    setTimeout(() => {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }, 150);
}

// Event Listeners
menuToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

// Close menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    preventTouchHighlight();
    initEducationalTools();

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            alert('Thank you for subscribing! You will receive updates at: ' + email);
            newsletterForm.reset();
        });
    }
});

// Educational Tools functionality
function initEducationalTools() {
    // Handle educational tools section links
    const toolLinks = document.querySelectorAll('.tool-card a, .tools-cta a');
    
    toolLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If the link contains a hash (section ID)
            if (href.includes('#') && !href.startsWith('#')) {
                e.preventDefault();
                
                // Extract the page and section
                const [page, section] = href.split('#');
                
                // Store the section in localStorage to scroll to it after page load
                if (section) {
                    localStorage.setItem('scrollToSection', section);
                }
                
                // Navigate to the page
                window.location.href = href;
            }
        });
    });
    
    // Check if we need to scroll to a section after page load
    const scrollToSection = localStorage.getItem('scrollToSection');
    if (scrollToSection) {
        // Clear the storage item
        localStorage.removeItem('scrollToSection');
        
        // Wait for page to fully load
        setTimeout(() => {
            const targetSection = document.getElementById(scrollToSection);
            if (targetSection) {
                // Scroll to the section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // If there are tabs, activate the correct tab
                const tabButtons = document.querySelectorAll('.tab-btn');
                if (tabButtons.length > 0) {
                    tabButtons.forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.getAttribute('data-tab') === scrollToSection) {
                            btn.classList.add('active');
                        }
                    });
                    
                    // Show the correct section
                    const featureSections = document.querySelectorAll('.feature-section');
                    featureSections.forEach(section => {
                        section.classList.remove('active');
                        if (section.id === scrollToSection) {
                            section.classList.add('active');
                        }
                    });
                }
            }
        }, 300);
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
});

// Active link highlighting
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scroll = window.scrollY;
        
        if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Event Listeners
window.addEventListener('scroll', updateActiveLink);

// Close menu on window resize (if in desktop mode)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Add this CSS to style the icon transition
const style = document.createElement('style');
style.textContent = `
    .menu-toggle i {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style); 