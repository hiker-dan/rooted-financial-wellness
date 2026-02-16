/*
 * Navigation JavaScript
 *
 * Handles mobile menu toggle, smooth scrolling,
 * and active navigation highlighting
 */

// ============================================
// MOBILE MENU TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  // Toggle mobile menu on button click
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

      // Toggle aria-expanded attribute
      menuToggle.setAttribute('aria-expanded', !isExpanded);

      // Toggle active class on menu
      navMenu.classList.toggle('active');

      // Prevent body scroll when menu is open
      body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking a navigation link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navMenu.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      const isMenuOpen = navMenu.classList.contains('active');

      if (!isClickInsideMenu && !isClickOnToggle && isMenuOpen) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
      }
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
        menuToggle.focus(); // Return focus to toggle button
      }
    });
  }
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Select all links with href starting with #
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') return;

      // Check if target element exists
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();

        // Get header height for offset (if header is sticky)
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;

        // Calculate target position
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update focus for accessibility
        targetElement.focus({ preventScroll: true });
      }
    });
  });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Find all navigation links
  const navLinks = document.querySelectorAll('.nav-menu a, .footer-nav a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');

    // Add 'active' class to current page link
    if (linkPage === currentPage) {
      link.classList.add('active');
    }

    // Handle index.html as home
    if (currentPage === '' && linkPage === 'index.html') {
      link.classList.add('active');
    }
  });
});

// ============================================
// HEADER SHADOW ON SCROLL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
});

// ============================================
// DETECT MOUSE VS KEYBOARD NAVIGATION
// ============================================

/*
 * This removes focus outlines for mouse users
 * but keeps them for keyboard users (accessibility)
 */
document.addEventListener('DOMContentLoaded', function() {
  let isUsingMouse = false;

  // Detect mouse usage
  document.body.addEventListener('mousedown', function() {
    isUsingMouse = true;
    document.body.classList.add('using-mouse');
  });

  // Detect keyboard usage
  document.body.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      isUsingMouse = false;
      document.body.classList.remove('using-mouse');
    }
  });
});
