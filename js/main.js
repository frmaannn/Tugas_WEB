/**
 * ===================================================================
 * CLASSIC ELEGANT PORTFOLIO - MAIN JAVASCRIPT (TAILWIND CSS READY)
 * Pemilik: Firman Maulana Firdauz (Informatika UMM)
 * Fitur: Dark/Light Mode Tailwind, Mobile Menu, Quote API, Toast
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initActiveNavLink();
  initBackToTop();
  initQuoteAPI();
});

/* =========================================================
   1. SISTEM TEMA TAILWIND (DARK / LIGHT MODE)
   ========================================================= */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  
  // Set tema awal
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Mode ${newTheme === 'dark' ? 'Malam (Dark)' : 'Klasik (Light)'} diaktifkan`);
    });
  }
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('🌙');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.removeAttribute('data-theme');
    updateThemeIcon('☀️');
  }
}

function updateThemeIcon(icon) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.textContent = icon;
    themeToggleBtn.setAttribute('title', `Ganti Tema`);
  }
}

/* =========================================================
   2. NAVIGASI MOBILE (HAMBURGER MENU DENGAN TAILWIND)
   ========================================================= */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isHidden = navMenu.classList.contains('hidden');
      if (isHidden) {
        navMenu.classList.remove('hidden');
        navMenu.classList.add('flex');
        hamburgerBtn.innerHTML = '✕';
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      } else {
        navMenu.classList.add('hidden');
        navMenu.classList.remove('flex');
        hamburgerBtn.innerHTML = '☰';
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Tutup menu saat tautan diklik pada layar kecil
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          navMenu.classList.add('hidden');
          navMenu.classList.remove('flex');
          hamburgerBtn.innerHTML = '☰';
        }
      });
    });
  }
}

/* =========================================================
   3. INDIKATOR NAVIGASI AKTIF
   ========================================================= */
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    if (currentPath.endsWith(href) || (currentPath.endsWith('/') && href === 'index.html')) {
      link.classList.add('text-gold-500', 'font-semibold', 'border-b-2', 'border-gold-500');
      link.classList.remove('text-stone-600', 'dark:text-stone-300');
    }
  });
}

/* =========================================================
   4. KEMBALI KE ATAS (BACK TO TOP)
   ========================================================= */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* =========================================================
   5. INTEGRASI API: KUTIPAN FILOSOFI / INSPIRATIF
   Mengambil data kutipan secara asinkron via fetch()
   ========================================================= */
const fallbackQuotes = [
  {
    quote: "Simplicity is the prerequisite for reliability.",
    author: "Edsger W. Dijkstra"
  },
  {
    quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    quote: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs"
  },
  {
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    quote: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House"
  }
];

async function initQuoteAPI() {
  const quoteTextElem = document.getElementById('quoteText');
  const quoteAuthorElem = document.getElementById('quoteAuthor');
  const quoteRefreshBtn = document.getElementById('quoteRefreshBtn');

  if (!quoteTextElem || !quoteAuthorElem) return;

  async function fetchRandomQuote() {
    quoteTextElem.style.opacity = '0.5';
    quoteTextElem.textContent = "Memuat kutipan sastra & filosofi...";

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('https://dummyjson.com/quotes/random', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Gagal memuat API');
      
      const data = await response.json();
      quoteTextElem.textContent = `"${data.quote}"`;
      quoteAuthorElem.textContent = `— ${data.author}`;
    } catch (err) {
      const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      quoteTextElem.textContent = `"${randomFallback.quote}"`;
      quoteAuthorElem.textContent = `— ${randomFallback.author}`;
    } finally {
      quoteTextElem.style.opacity = '1';
    }
  }

  // Muat kutipan awal
  fetchRandomQuote();

  if (quoteRefreshBtn) {
    quoteRefreshBtn.addEventListener('click', () => {
      fetchRandomQuote();
    });
  }
}

/* =========================================================
   6. HELPER NOTIFIKASI TOAST BERBASIS TAILWIND CSS
   ========================================================= */
function showToast(message, duration = 3500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto bg-white dark:bg-[#201E1B] text-stone-900 dark:text-stone-100 border border-gold-500 shadow-xl px-5 py-3.5 rounded flex items-center gap-3 text-sm animate-slide-in';
  toast.innerHTML = `
    <span class="text-gold-500 text-lg">❖</span>
    <span class="font-medium">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
