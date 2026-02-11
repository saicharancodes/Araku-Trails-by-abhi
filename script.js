/* ===================================
   JAVASCRIPT FOR ARAKU TRAILS WEBSITE
   Handles mobile menu, scroll effects, and smooth scrolling
   =================================== */

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {

    /* ===================================
       MOBILE MENU TOGGLE
       Opens/closes navigation on mobile devices
       =================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Toggle mobile menu when hamburger is clicked
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');

        // Animate hamburger icon (transforms into X)
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    /* ===================================
       HEADER SCROLL EFFECT
       Adds background to header when user scrolls down
       =================================== */
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        // Add 'scrolled' class when user scrolls more than 100px
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ===================================
       SMOOTH SCROLLING
       Enables smooth scroll behavior for anchor links
       =================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only apply smooth scroll to internal anchors (not just #)
            if (href !== '#') {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Scroll to target element with smooth animation
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    /* ===================================
       SCROLL ANIMATIONS (OPTIONAL)
       Adds fade-in effect to elements as they enter viewport
       =================================== */
    // Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,  // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'  // Start animation slightly before element enters viewport
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);  // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all package cards for animation
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        observer.observe(card);
    });

    /* ===================================
       LAZY LOADING IMAGES (OPTIONAL)
       Improves page load performance by loading images as needed
       =================================== */
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    /* ===================================
       CAROUSEL
       =================================== */
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });
        nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { showSlide(i); stopAutoSlide(); startAutoSlide(); });
    });

    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    if (slides.length > 0) startAutoSlide();

});

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

/**
 * Debounce function - limits how often a function can be called
 * Useful for scroll and resize events to improve performance
 * @param {Function} func - The function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
