document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // Navbar logo and header shrink on scroll
  const navbar = document.querySelector('.navbar');
  function handleNavbarShrink() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Use computed max-height for body padding
    const computedMaxHeight = window.getComputedStyle(navbar).maxHeight;
    document.body.style.paddingTop = computedMaxHeight;
  }
  window.addEventListener('scroll', handleNavbarShrink);
  window.addEventListener('resize', handleNavbarShrink); // Ensure correct state on resize
  handleNavbarShrink(); // Run on load
});