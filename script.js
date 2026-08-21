// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const themeTabs = document.querySelectorAll('.theme-tab');
const themeCards = document.querySelectorAll('.theme-card');
const pricingTabs = document.querySelectorAll('.pricing-tab');
const pricingPanels = document.querySelectorAll('.pricing-panel');
const faqItems = document.querySelectorAll('.faq-item');
const statNumbers = document.querySelectorAll('.stat-number');

// ===== NAVBAR SCROLL =====
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollY = scrollY;
});

// ===== HAMBURGER MENU =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ===== THEME TABS =====
themeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.tab;
    
    // Update active tab
    themeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Filter cards
    themeCards.forEach(card => {
      if (card.dataset.category === category) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Initialize - show premium tabs
document.querySelector('.theme-tab[data-tab="premium"]').click();

// ===== PRICING TABS =====
pricingTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const panelId = tab.dataset.ptab;
    
    // Update active tab
    pricingTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Show panel
    pricingPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === `panel-${panelId}`) {
        panel.classList.add('active');
      }
    });
  });
});

// ===== FAQ ACCORDION =====
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    
    // Close all
    faqItems.forEach(i => i.classList.remove('open'));
    
    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const start = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    
    if (isDecimal) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Intersection Observer for counter
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.section-header, .theme-card, .video-card, .feature-card, .faq-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 50);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

console.log('🎉 Creative Wedding Studio - Website Loaded Successfully!');
