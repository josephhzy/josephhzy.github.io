/* ============================================================
   Joseph Zhi Yu — Portfolio
   Custom JS. No template dependency.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- AOS (Animate on Scroll) ---- */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true, offset: 60 });
  }

  /* ---- Mobile Sidebar Toggle ---- */
  const toggle   = document.getElementById('sidebar-toggle');
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('nav-open');
    toggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('nav-open');
    toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
  // Close sidebar when a nav link is clicked (mobile)
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1200) closeSidebar();
    });
  });

  /* ---- Back to Top ---- */
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 250);
    });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Active Nav on Scroll (index.html only) ---- */
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-10% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ---- Typed Text Effect (replaces Typed.js) ---- */
  const el = document.querySelector('[data-typed-items]');
  if (el) {
    const items = el.getAttribute('data-typed-items').split(',').map(s => s.trim());
    let itemIndex = 0, charIndex = 0, deleting = false;

    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    el.insertAdjacentElement('afterend', cursor);

    function type() {
      const current = items[itemIndex];
      if (!deleting) {
        el.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 1800); // pause at full word
          return;
        }
      } else {
        el.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          itemIndex = (itemIndex + 1) % items.length;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    type();
  }

});
