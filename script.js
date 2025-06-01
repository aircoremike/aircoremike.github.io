// Shrink header on scroll
window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
      header.classList.add("shrink");
    } else {
      header.classList.remove("shrink");
    }
  });
  
  // Toggle mobile nav
  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("nav-menu").classList.toggle("hidden");
  });