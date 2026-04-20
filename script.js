document.addEventListener('DOMContentLoaded', function () {
  // Cookies
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookies');
  if (localStorage.getItem('loratma_cookies_accepted')) {
    cookieBanner.style.display = 'none';
  }
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem('loratma_cookies_accepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  // Menu mobile
  const burger = document.getElementById('mobileburger');
  const menu = document.getElementById('mobileMenu');

  if (burger && menu) {
    burger.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Fermer avec Echap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileMenu();
  });
});

function openMobileMenu() {
  const burger = document.getElementById('mobileburger');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  menu.classList.add('is-open');
  backdrop.classList.add('is-open');
  burger.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const burger = document.getElementById('mobileburger');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  if (!menu) return;
  menu.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  burger.classList.remove('is-open');
  document.body.style.overflow = '';
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
