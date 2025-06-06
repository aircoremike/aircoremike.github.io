document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
    }

    // Navbar shrink on scroll
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 10;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Add scroll and resize event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Run on initial load
    handleScroll();

    // Update body padding when navbar height changes
    const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            document.body.style.paddingTop = entry.contentRect.height + 'px';
        }
    });

    observer.observe(navbar);
});