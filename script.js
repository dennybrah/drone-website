// ===================================
// Mobile Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Contact Form Validation & Submission
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Form field elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceSelect = document.getElementById('service');
    const projectTextarea = document.getElementById('project');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const serviceError = document.getElementById('serviceError');
    const projectError = document.getElementById('projectError');

    // Success message element
    const formSuccess = document.getElementById('formSuccess');

    // Validation functions
    function validateName() {
        const value = nameInput.value.trim();
        if (value === '') {
            nameError.textContent = 'Name is required';
            nameInput.style.borderColor = 'var(--error-color)';
            return false;
        } else if (value.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = 'var(--error-color)';
            return false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = 'var(--border-color)';
            return true;
        }
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        if (value === '') {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = 'var(--error-color)';
            return false;
        } else if (!emailRegex.test(value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = 'var(--error-color)';
            return false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = 'var(--border-color)';
            return true;
        }
    }

    function validateService() {
        const value = serviceSelect.value;
        if (value === '') {
            serviceError.textContent = 'Please select a service';
            serviceSelect.style.borderColor = 'var(--error-color)';
            return false;
        } else {
            serviceError.textContent = '';
            serviceSelect.style.borderColor = 'var(--border-color)';
            return true;
        }
    }

    function validateProject() {
        const value = projectTextarea.value.trim();
        if (value === '') {
            projectError.textContent = 'Project details are required';
            projectTextarea.style.borderColor = 'var(--error-color)';
            return false;
        } else if (value.length < 10) {
            projectError.textContent = 'Please provide more details (at least 10 characters)';
            projectTextarea.style.borderColor = 'var(--error-color)';
            return false;
        } else {
            projectError.textContent = '';
            projectTextarea.style.borderColor = 'var(--border-color)';
            return true;
        }
    }

    // Real-time validation
    if (nameInput) nameInput.addEventListener('blur', validateName);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (serviceSelect) serviceSelect.addEventListener('change', validateService);
    if (projectTextarea) projectTextarea.addEventListener('blur', validateProject);

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isServiceValid = validateService();
        const isProjectValid = validateProject();

        // Check if all validations passed
        if (isNameValid && isEmailValid && isServiceValid && isProjectValid) {
            // Allow form to submit to Netlify
            contactForm.submit();
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// ===================================
// Add Animation on Scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .process-step, .faq-item, .service-detail');

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===================================
// Active Navigation Highlighting
// ===================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

// ===================================
// Lightbox Gallery
// ===================================

function openLightbox() {
  document.getElementById("lightboxModal").style.display = "block";
  document.body.style.overflow = "hidden"; // Disable scrolling
}

function closeLightbox() {
  document.getElementById("lightboxModal").style.display = "none";
  document.body.style.overflow = "auto"; // Enable scrolling
}

let slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].style.removeProperty("display"); // Clean up inline styles
    slides[i].classList.remove("active-slide"); // Use class for state if needed, but display:flex is used here
    slides[i].style.display = "none"; 
  }
  
  // MySlides are flexboxes in CSS, so we need to set them to flex, not block
  slides[slideIndex-1].style.display = "flex";
}

// Keyboard Navigation
document.addEventListener('keydown', function(event) {
    if (document.getElementById("lightboxModal").style.display === "block") {
        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            plusSlides(-1);
        } else if (event.key === "ArrowRight") {
            plusSlides(1);
        }
    }
});

