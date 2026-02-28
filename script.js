const links = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('.content section');
const worksToggle = document.getElementById('works-toggle');
const worksMenu = document.querySelector('.works-menu');
const dyplomToggle = document.getElementById('dyplom-toggle');
const dyplomMenu = document.querySelector('.dyplom-menu');
const matkiToggle = document.getElementById('matki-toggle');
const matkiMenu = document.querySelector('.matki-menu');
const stopkaToggle = document.getElementById('stopka-toggle');
const stopkaMenu = document.querySelector('.stopka-menu');
const bookMenu = document.querySelector('.book-menu');
const bookToggle = document.getElementById('book-toggle');
const homeLink = document.getElementById('home');
const contentContainer = document.querySelector('.content');
const footerLogo = document.getElementById("kpo-footer");
const modal = document.getElementById("kpo-modal");
const closeBtn = document.querySelector(".close");

footerLogo.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Utility to close all submenus except one (optional)
function closeAllSubmenus(except = null) {
  const menus = [worksMenu, dyplomMenu, matkiMenu, stopkaMenu,bookMenu];
  menus.forEach(menu => {
    if (menu !== except) menu.classList.remove('show');
  });
}

// Toggle main Works dropdown
worksToggle.addEventListener('click', (e) => {
  e.preventDefault();
  worksMenu.classList.toggle('show');
  if (!worksMenu.classList.contains('show')) closeAllSubmenus();
});

// Toggle Dyplom menu
dyplomToggle.addEventListener('click', (e) => {
  e.preventDefault();
  dyplomMenu.classList.toggle('show');
  matkiMenu.classList.remove('show');
  stopkaMenu.classList.remove('show');
  bookMenu.classList.remove('show');
  setActiveLink(dyplomToggle);
  showSection('dyplom');
});

// Toggle Matki menu
matkiToggle.addEventListener('click', (e) => {
  e.preventDefault();
  matkiMenu.classList.toggle('show');
  dyplomMenu.classList.remove('show');
  stopkaMenu.classList.remove('show');
  bookMenu.classList.remove('show');
  setActiveLink(matkiToggle);
  showSection('matki');
});

stopkaToggle.addEventListener('click', (e) => {
  e.preventDefault();
  stopkaMenu.classList.toggle('show');
  dyplomMenu.classList.remove('show');
  matkiMenu.classList.remove('show');
  bookMenu.classList.remove('show');
  setActiveLink(stopkaToggle);
  showSection('stopka');
});

bookToggle.addEventListener('click', (e) => {
  e.preventDefault();
  bookMenu.classList.toggle('show');
  dyplomMenu.classList.remove('show');
  matkiMenu.classList.remove('show');
  stopkaMenu.classList.remove('show');
  setActiveLink(bookToggle);
  showSection('book');
});

// Set active link
function setActiveLink(activeLink) {
  links.forEach((link) => link.classList.remove('active'));
  if (activeLink) activeLink.classList.add('active');
}

// Show the correct section and scroll to top
function showSection(sectionId) {
  sections.forEach((sec) => sec.classList.remove('active-section'));
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active-section');
    contentContainer.scrollTop = 0;
  }
}

// Generic section activation
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    const sectionId = link.getAttribute('data-section');
    if (!sectionId) return;

    e.preventDefault();
    setActiveLink(link);
    showSection(sectionId);

    // Identify which top-level menu this link belongs to
    const isWorks = link.closest('.works-menu');
    const isDyplom = link.closest('.dyplom-menu');
    const isMatki = link.closest('.matki-menu');
    const isStopka = link.closest('.stopka-menu');
    const isBook = link.closest('.book-menu');

    // Close only unrelated menus
    if (!isWorks && link !== worksToggle) {
      worksMenu.classList.remove('show');
    }

    if (!isDyplom && link !== dyplomToggle) {
      dyplomMenu.classList.remove('show');
    }

    if (!isMatki && link !== matkiToggle) {
      matkiMenu.classList.remove('show');
    }

    if (!isStopka && link !== stopkaToggle) {
      stopkaMenu.classList.remove('show');
    }

    if (!isBook && link !== bookToggle) {
      bookMenu.classList.remove('show');
    }
  });
});

// Reset to home
homeLink.addEventListener('click', function(e) {
  e.preventDefault();

  links.forEach(link => link.classList.remove('active'));
  setActiveLink(homeLink);

  showSection('home-landing');   // ← THIS is missing

  worksMenu.classList.remove('show');
  dyplomMenu.classList.remove('show');
  matkiMenu.classList.remove('show');
  stopkaMenu.classList.remove('show');
  bookMenu.classList.remove('show');
});

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('.slider').forEach(slider => {

    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');

    slider.currentSlide = 0;
    let autoPlayInterval = null;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
      slider.currentSlide = index;
    }

    function nextSlide() {
      const newIndex = (slider.currentSlide + 1) % slides.length;
      showSlide(newIndex);
    }

    function prevSlide() {
      const newIndex = (slider.currentSlide - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    }

    // Buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Autoplay only for landing slider
    if (slider.classList.contains('auto-slider')) {

      const homeSection = document.getElementById('home-landing');

      function startAuto() {
        if (!autoPlayInterval) {
          autoPlayInterval = setInterval(nextSlide, 800);
        }
      }

      function stopAuto() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }

      const observer = new MutationObserver(() => {
        if (homeSection.classList.contains('active-section')) {
          startAuto();
        } else {
          stopAuto();
        }
      });

      observer.observe(homeSection, { attributes: true });

      if (homeSection.classList.contains('active-section')) {
        startAuto();
      }
    }

    showSlide(0);
  });

});
document.addEventListener('keydown', function (e) {

  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

  const activeSection = document.querySelector('.active-section');
  if (!activeSection) return;

  const activeSlider = activeSection.querySelector('.slider');
  if (!activeSlider) return;

  const slides = activeSlider.querySelectorAll('.slide');
  if (!slides.length) return;

  let current = activeSlider.currentSlide || 0;

  if (e.key === "ArrowRight") {
    current = (current + 1) % slides.length;
  }

  if (e.key === "ArrowLeft") {
    current = (current - 1 + slides.length) % slides.length;
  }

  slides.forEach(slide => slide.classList.remove('active'));
  slides[current].classList.add('active');

  activeSlider.currentSlide = current;
});

/* =========================
   AUTO HIDE FOOTER (2s)
   ========================= */

const footer = document.querySelector('.site-footnote');
let inactivityTimer;

function showFooter() {
  footer.style.opacity = '1';
  footer.style.pointerEvents = 'auto';
}

function hideFooter() {
  footer.style.opacity = '0';
  footer.style.pointerEvents = 'none';
}

function resetInactivityTimer() {
  showFooter();
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(hideFooter, 2000);
}

// Detect mouse movement
document.addEventListener('mousemove', resetInactivityTimer);

// Optional: also detect scrolling
document.addEventListener('scroll', resetInactivityTimer);

// Start hidden after 2 seconds
inactivityTimer = setTimeout(hideFooter, 2000);
