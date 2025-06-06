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
  const header = document.querySelector('header');
  function handleNavbarShrink() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
      header.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarShrink);
  window.addEventListener('resize', handleNavbarShrink); // Ensure correct state on resize
  handleNavbarShrink(); // Run on load
});