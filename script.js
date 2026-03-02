document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // Force glassmorphism to show smoothly
            if (window.scrollY === 0) navbar.classList.remove('scrolled');
        }
    });

    // Handle initial state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            mobileBtn.innerHTML = '<i class="ph ph-x"></i>';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('active');
            mobileBtn.innerHTML = '<i class="ph ph-list"></i>';
            document.body.style.overflow = '';
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // 3. Counter Animation (Metrics Ribbon)
    const counters = document.querySelectorAll('.counter');
    const metricsSection = document.querySelector('.metrics-ribbon');
    let hasAnimated = false;

    function formatNumber(num, isDecimal) {
        if (isDecimal) {
            return parseFloat(num).toFixed(1); // For 1.47, 26.7
        }
        return Math.floor(num); // For 393, 10
    }

    function animateCounters() {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix');
            const isDecimal = target % 1 !== 0 || target === 1.47;

            let currentValue = 0; // Prevent loss of decimal data

            const updateCounter = () => {
                const increment = target / 100; // Adjust speed by changing divisor

                if (currentValue < target) {
                    currentValue += increment;
                    counter.innerText = formatNumber(currentValue > target ? target : currentValue, isDecimal);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target + suffix;
                }
            };

            updateCounter();
        });
    }

    // Intersection Observer for Counters
    if (metricsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                animateCounters();
                hasAnimated = true;
            }
        }, { threshold: 0.5 });

        observer.observe(metricsSection);
    }

    // 4. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.expertise-card, .case-study-block, .section-header');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Active Nav Link Updates
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });
});
