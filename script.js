// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Active Nav Link Highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollY = window.pageYOffset + 200;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== Mobile Navigation =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Typewriter Effect =====
const typewriterEl = document.getElementById('typewriter');
const roles = [
    'Full Stack Applications',
    'AI-Powered Systems',
    'LLM Integrations',
    'RESTful APIs',
    'Multi-Agent Platforms',
    'IoT Solutions'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeWriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
    }

    setTimeout(typeWriter, typingSpeed);
}

if (typewriterEl) {
    typeWriter();
}

// ===== Scroll Reveal Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const target = parseFloat(entry.target.getAttribute('data-count'));
                const isDecimal = target % 1 !== 0;
                const duration = 1500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);

                    const current = eased * target;

                    if (isDecimal) {
                        entry.target.textContent = current.toFixed(1);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

animateCounters();

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Subtle Parallax for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-visual');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
});

// ===== Name Letters Stagger Animation on Load =====
window.addEventListener('load', () => {
    document.querySelectorAll('.name-letter').forEach((letter, i) => {
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, 200 + i * 80);
    });
});

// ===== Preloader / Initial Animation =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.hero .animate-on-scroll').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 120);
        });
    }, 200);
});

// ===== Contact Form (Web3Forms) =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('contactSubmitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'form-status success visible';
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            formStatus.textContent = '✕ Failed to send message. Please try again or email me directly.';
            formStatus.className = 'form-status error visible';
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');

            // Auto-hide status after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('visible');
            }, 5000);
        }
    });
}

console.log('%c→ Portfolio of Suraj S', 'color: #1a1a1a; font-size: 18px; font-weight: bold;');
console.log('%cBuilt with vanilla JS', 'color: #666; font-size: 13px;');
