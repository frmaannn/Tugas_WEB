/**
 * ===================================================================
 * MAIN SCRIPT - TAILWIND CSS
 * Fitur: Dark/Light Mode, Mobile Menu, Quote API, Toast Sederhana
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
  
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Mode ${newTheme === 'dark' ? 'Malam' : 'Terang'} aktif`);
    });
  }
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    updateThemeIcon('🌙');
  } else {
    document.documentElement.classList.remove('dark');
    updateThemeIcon('☀️');
  }
}

function updateThemeIcon(icon) {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.textContent = icon;
  }
}

/* =========================================================
   2. NAVIGASI MOBILE (HAMBURGER)
   ========================================================= */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isHidden = navMenu.classList.contains('hidden');
      if (isHidden) {
        navMenu.classList.remove('hidden');
        navMenu.classList.add('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'right-0', 'bg-white', 'dark:bg-[#201E1B]', 'p-4', 'border-b', 'border-stone-200', 'dark:border-stone-800', 'shadow');
        hamburgerBtn.innerHTML = '✕';
      } else {
        navMenu.classList.add('hidden');
        navMenu.classList.remove('flex', 'flex-col', 'absolute', 'top-16', 'left-0', 'right-0', 'bg-white', 'dark:bg-[#201E1B]', 'p-4', 'border-b', 'border-stone-200', 'dark:border-stone-800', 'shadow');
        hamburgerBtn.innerHTML = '☰';
      }
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
      link.classList.add('text-gold-500', 'font-medium', 'border-b', 'border-gold-500');
      link.classList.remove('text-stone-600', 'dark:text-stone-400');
    }
  });
}

/* =========================================================
   4. KEMBALI KE ATAS
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
   5. INTEGRASI API: KUTIPAN FILOSOFI
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
    quote: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  }
];

async function initQuoteAPI() {
  const quoteTextElem = document.getElementById('quoteText');
  const quoteAuthorElem = document.getElementById('quoteAuthor');
  const quoteRefreshBtn = document.getElementById('quoteRefreshBtn');

  if (!quoteTextElem || !quoteAuthorElem) return;

  async function fetchRandomQuote() {
    quoteTextElem.style.opacity = '0.5';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('https://dummyjson.com/quotes/random', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error('Gagal API');
      
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

  fetchRandomQuote();

  if (quoteRefreshBtn) {
    quoteRefreshBtn.addEventListener('click', () => {
      fetchRandomQuote();
    });
  }
}

/* =========================================================
   6. NOTIFIKASI TOAST BERSIH
   ========================================================= */
function showToast(message, duration = 3000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border border-stone-700 dark:border-stone-300 px-3.5 py-2 rounded shadow text-xs flex items-center gap-2 animate-slide-in';
  toast.innerHTML = `
    <span class="text-gold-500 font-bold">•</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}
