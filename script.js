document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    const scrollThreshold = 10;

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
            }
        });
    }

    // Optimized scroll handler
    function handleScroll() {
        const currentScroll = window.scrollY;
        
        // Only update class if we've crossed the threshold
        if (currentScroll > scrollThreshold && !navbar.classList.contains('scrolled')) {
            navbar.classList.add('scrolled');
        } else if (currentScroll <= scrollThreshold && navbar.classList.contains('scrolled')) {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }

    // Add event listeners with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
});