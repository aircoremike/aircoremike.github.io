document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // Navbar logo shrink on scroll
  const navbar = document.querySelector('.navbar');
  function handleNavbarShrink() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarShrink);
  handleNavbarShrink(); // Run on load
});