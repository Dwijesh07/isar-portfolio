// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation to elements
function checkScroll() {
    const elements = document.querySelectorAll('.animate-fade-in-up');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
}

// Add hover effect to project cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    const originalText = element.textContent;
    
    function type() {
        if (i < text.length) {
            element.textContent = originalText.substring(0, i) + text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Restore original text after animation
            setTimeout(() => {
                element.textContent = originalText;
            }, 2000);
        }
    }
    
    type();
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    loadTheme();
    
    // Initial scroll check
    checkScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
    
    // Add theme toggle button event listener
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Optional: Add typing animation to hero title (uncomment if wanted)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }
    
    // Add click outside to close mobile menu
    document.addEventListener('click', function(event) {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
});