document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // Navbar logo and navbar shrink on scroll
  const navbar = document.querySelector('.navbar');
  function handleNavbarShrink() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
      document.body.style.paddingTop = navbar.classList.contains('scrolled') ? '64px' : '160px';
    } else {
      navbar.classList.remove('scrolled');
      document.body.style.paddingTop = '160px';
    }
  }
  window.addEventListener('scroll', handleNavbarShrink);
  window.addEventListener('resize', handleNavbarShrink);
  handleNavbarShrink(); // Run on load
});