/**
 * =========================================================================
 * LAVANISH P - PORTFOLIO INTERACTION & LOGIC
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLinkPopulator();
  initTypingEffect();
  initScrollspy();
  initMobileNav();
  initSkillFilters();
  initModals();
  initCopyButtons();
  initContactForm();
  initBackToTop();
});

/* --- 1. DYNAMIC CONFIG & LINK POPULATOR --- */
function initLinkPopulator() {
  if (typeof PORTFOLIO_CONFIG === 'undefined') return;

  const { personal, links, projects } = PORTFOLIO_CONFIG;

  // Populate text fields
  document.querySelectorAll('[data-config-text]').forEach(el => {
    const key = el.getAttribute('data-config-text');
    if (personal[key]) {
      el.textContent = personal[key];
    }
  });

  // Populate anchor links
  document.querySelectorAll('[data-link-key]').forEach(linkEl => {
    const key = linkEl.getAttribute('data-link-key');
    if (links[key]) {
      linkEl.href = links[key];
    }
  });

  // Populate project links
  if (projects && projects.length > 0) {
    projects.forEach(project => {
      const gitLink = document.querySelector(`[data-project-github="${project.id}"]`);
      if (gitLink && project.githubRepo) {
        gitLink.href = project.githubRepo;
      }
      const demoLink = document.querySelector(`[data-project-demo="${project.id}"]`);
      if (demoLink && project.liveDemo) {
        demoLink.href = project.liveDemo;
      }
    });
  }
}

/* --- 2. DARK / LIGHT THEME TOGGLE --- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('lavanish_portfolio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('lavanish_portfolio_theme', newTheme);
      themeToggleBtn.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* --- 3. DYNAMIC TYPING EFFECT --- */
function initTypingEffect() {
  const typingTarget = document.getElementById('typing-text');
  if (!typingTarget) return;

  const phrases = [
    'Full Stack Developer',
    'B.Tech IT Undergraduate',
    'React.js & Python Builder',
    'Passionate Problem Solver',
    'REST API Developer'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --- 4. SCROLLSPY & NAVIGATION (Modern Web Guidance Compliant) --- */
function initScrollspy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const supportsScrollTargetGroup = CSS.supports && CSS.supports('scroll-target-group: auto');

  if (supportsScrollTargetGroup) {
    const syncAriaCurrent = () => {
      const currentLink = document.querySelector('.nav-menu a:target-current');
      navLinks.forEach(link => {
        link.setAttribute('aria-current', link === currentLink ? 'true' : 'false');
      });
    };
    syncAriaCurrent();
    document.addEventListener('scrollend', syncAriaCurrent);
  } else {
    // IntersectionObserver fallback
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle(':target-current', isActive);
            link.setAttribute('aria-current', isActive ? 'true' : 'false');
          });
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }
}

/* --- 5. MOBILE NAVIGATION DRAWER --- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  const closeMenu = () => {
    toggleBtn.classList.remove('open');
    navMenu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --- 6. SKILL FILTERS --- */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 7. MODAL DIALOGS --- */
function initModals() {
  // Generic modal triggers
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
      }
    });
  });

  // Modal close buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('dialog');
      if (modal && typeof modal.close === 'function') {
        modal.close();
      }
    });
  });

  // Click outside to dismiss
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
}

/* --- 8. COPY TO CLIPBOARD BUTTONS --- */
function initCopyButtons() {
  document.querySelectorAll('[data-copy-value]').forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-copy-value');
      const label = btn.getAttribute('data-copy-label') || 'Text';

      navigator.clipboard.writeText(value).then(() => {
        showToast(`${label} copied to clipboard!`);
      }).catch(() => {
        showToast(`Failed to copy to clipboard`);
      });
    });
  });
}

/* --- 9. CONTACT FORM LOGIC --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const subject = document.getElementById('form-subject')?.value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Compose mailto link to Lavanish's email
    const recipient = 'lavanish17042007@gmail.com';
    const body = `Hi Lavanish,\n\nMy name is ${name} (${email}).\n\n${message}`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showToast('Opening your email client to send message...');
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);

    form.reset();
  });
}

/* --- 10. BACK TO TOP BUTTON --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- 11. TOAST NOTIFICATION UTILITY --- */
function showToast(message, duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
