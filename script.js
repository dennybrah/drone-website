// ===================================
// Mobile Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
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
    anchor.addEventListener('click', function (e) {
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
    contactForm.addEventListener('submit', function (e) {
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

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to elements
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .process-step, .faq-item, .service-detail, .gallery-container');

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
window.addEventListener('scroll', function () {
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
// Class-Based Gallery Implementation
// ===================================

class Gallery {
    constructor(containerId, imagesFolder, imageList) {
        this.container = document.getElementById(containerId);
        this.imagesFolder = imagesFolder;
        this.imageList = imageList; // Array of filenames
        this.currentIndex = 0;

        if (!this.container) return; // Guard clause

        // Create a safe variable name for inline handlers (no dashes)
        this.safeId = containerId.replace(/-/g, '_');

        // Expose instance for inline onclick handlers
        window['gallery_' + this.safeId] = this;

        this.init();
    }

    init() {
        this.renderCarousel();
        this.setupLightbox();
        this.addEventListeners();
    }

    renderCarousel() {
        // Create HTML structure for the carousel
        let html = '';

        // Navigation Buttons
        html += `<a class="gallery-btn-prev" onclick="gallery_${this.safeId}.moveSlide(-1)">&#10094;</a>`;
        html += `<a class="gallery-btn-next" onclick="gallery_${this.safeId}.moveSlide(1)">&#10095;</a>`;

        // Slides
        this.imageList.forEach((imgName, index) => {
            const displayStyle = index === 0 ? 'block' : 'none';
            const activeClass = index === 0 ? 'active' : '';
            html += `
                <div class="gallery-slide ${activeClass}" style="display: ${displayStyle}" onclick="gallery_${this.safeId}.openLightbox(${index})">
                    <img src="${this.imagesFolder}/${imgName}" style="width:100%; object-fit: cover; aspect-ratio: 4/3;">
                    <div class="gallery-counter">${index + 1} / ${this.imageList.length}</div>
                </div>
            `;
        });

        this.container.innerHTML = html;
        this.slides = this.container.querySelectorAll('.gallery-slide');
    }

    moveSlide(n) {
        this.showSlide(this.currentIndex + n);
    }

    showSlide(n) {
        // Wrap around
        if (n >= this.imageList.length) {
            this.currentIndex = 0;
        } else if (n < 0) {
            this.currentIndex = this.imageList.length - 1;
        } else {
            this.currentIndex = n;
        }

        // Hide all
        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });

        // Show current
        this.slides[this.currentIndex].style.display = 'block';
        this.slides[this.currentIndex].classList.add('active');

        // Also update lightbox if it's open
        // (Optional interaction, keeping simple for now)
    }

    // Lightbox Logic
    setupLightbox() {
        // Check if global lightbox exists, if not create it
        if (!document.getElementById('globalLightbox')) {
            const lightboxHtml = `
                <div id="globalLightbox" class="lightbox-modal">
                    <button class="lightbox-close" onclick="closeGlobalLightbox()">&times;</button>
                    <a class="lightbox-btn-prev" onclick="activeGalleryInstance.moveLightbox(-1)">&#10094;</a>
                    <a class="lightbox-btn-next" onclick="activeGalleryInstance.moveLightbox(1)">&#10095;</a>
                    <div class="lightbox-content-wrapper">
                        <img id="lightboxImage" class="lightbox-image" src="" alt="Gallery Image">
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', lightboxHtml);

            // Global Close Function
            window.closeGlobalLightbox = () => {
                document.getElementById('globalLightbox').style.display = 'none';
                document.body.style.overflow = 'auto';
            };

            // Global Key Events
            document.addEventListener('keydown', (e) => {
                if (document.getElementById('globalLightbox').style.display === 'block') {
                    if (e.key === 'Escape') closeGlobalLightbox();
                    if (e.key === 'ArrowLeft' && window.activeGalleryInstance) window.activeGalleryInstance.moveLightbox(-1);
                    if (e.key === 'ArrowRight' && window.activeGalleryInstance) window.activeGalleryInstance.moveLightbox(1);
                }
            });
        }
    }

    openLightbox(index) {
        this.currentIndex = index;
        window.activeGalleryInstance = this; // Set global active instance

        const lightbox = document.getElementById('globalLightbox');
        const img = document.getElementById('lightboxImage');

        img.src = `${this.imagesFolder}/${this.imageList[this.currentIndex]}`;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    moveLightbox(n) {
        this.moveSlide(n); // Update the carousel behind the scenes too
        const img = document.getElementById('lightboxImage');
        // Preload/Swap
        img.style.opacity = 0;
        setTimeout(() => {
            img.src = `${this.imagesFolder}/${this.imageList[this.currentIndex]}`;
            img.onload = () => { img.style.opacity = 1; };
        }, 200);
    }

    addEventListeners() {
        // Handled via onclick attributes for simplicity in this generated HTML
    }
}
