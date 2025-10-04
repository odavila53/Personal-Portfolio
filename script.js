const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.textContent = '🌙';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    if (body.classList.contains('light-theme')) {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    lastScroll = currentScroll;
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate
document.querySelectorAll('.hero > *').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const resumeBtn = document.getElementById('resumeBtn');
const resumeModal = document.getElementById('resumeModal');
const closeModal = document.querySelector('.close-modal');

resumeBtn.addEventListener('click', () => {
    resumeModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    resumeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        resumeModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

emailjs.init("NUagRg3_nReM7qHHX");

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitButton = contactForm.querySelector('.submit-button');
const buttonText = submitButton.querySelector('.button-text');
const buttonLoading = submitButton.querySelector('.button-loading');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline';
    formMessage.style.display = 'none';

    emailjs.sendForm('service_1gs0bza', 'template_4zrd9ji', this)
        .then(function() {
            formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon!.';
            formMessage.className = 'form-message success';
            contactForm.reset();

            submitButton.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
        
        }, function(error) {
            formMessage.textContent = 'Oops! Something went wrong! Please try again';
            formMessage.className = 'form-message error';
            console.error('EmailJS error:', error);

            submitButton.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';

        });
});