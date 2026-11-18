/**
 * ===================================================================
 * CLASSIC ELEGANT PORTFOLIO - PROJECTS & GITHUB API (TAILWIND CSS READY)
 * Pemilik: Firman Maulana Firdauz (Informatika UMM)
 * Fitur: Filter Kategori Proyek, Live GitHub REST API Explorer
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initGitHubExplorer();
});

/* =========================================================
   1. FILTER KATEGORI PROYEK KURASI
   ========================================================= */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Perbarui style tombol aktif menggunakan class Tailwind
      filterBtns.forEach(b => {
        b.classList.remove('bg-gold-500', 'text-white', 'border-gold-500');
        b.classList.add('bg-white', 'dark:bg-[#201E1B]', 'text-stone-700', 'dark:text-stone-300', 'border-[#E6DFD3]', 'dark:border-[#2F2C27]');
      });

      btn.classList.remove('bg-white', 'dark:bg-[#201E1B]', 'text-stone-700', 'dark:text-stone-300', 'border-[#E6DFD3]', 'dark:border-[#2F2C27]');
      btn.classList.add('bg-gold-500', 'text-white', 'border-gold-500');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.classList.add('flex');
        } else {
          card.classList.add('hidden');
          card.classList.remove('flex');
        }
      });
    });
  });
}

/* =========================================================
   2. INTEGRASI GITHUB REST API
   ========================================================= */

// Data demonstrasi cadangan Firman Maulana Firdauz (UMM)
const mockGitHubData = {
  user: {
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    name: "Firman Maulana Firdauz",
    login: "firmanmf",
    bio: "Mahasiswa Teknik Informatika Universitas Muhammadiyah Malang (UMM) • Pengembang Web & Penggemar Desain Klasik.",
    public_repos: 14,
    followers: 86,
    html_url: "https://github.com"
  },
  repos: [
    {
      name: "umm-classic-portfolio",
      description: "Website portofolio tugas pemrograman web berbasis HTML5, Tailwind CSS, JavaScript murni, dan integrasi multi-API publik.",
      language: "JavaScript",
      stargazers_count: 38,
      forks_count: 7,
      html_url: "https://github.com"
    },
    {
      name: "informatika-web-lab",
      description: "Kumpulan modul praktikum pemrograman web Informatika Universitas Muhammadiyah Malang dengan dokumentasi terstruktur.",
      language: "HTML",
      stargazers_count: 29,
      forks_count: 4,
      html_url: "https://github.com"
    },
    {
      name: "literature-quotes-api",
      description: "Modul async/await JavaScript untuk mengonsumsi REST API kutipan sastra dunia dengan caching lokal dan fallback anggun.",
      language: "JavaScript",
      stargazers_count: 24,
      forks_count: 3,
      html_url: "https://github.com"
    },
    {
      name: "aurora-tailwind-theme",
      description: "Sistem desain antarmuka berbasis Tailwind CSS & tipografi klasik elegan dengan palet warna emas dan parchment.",
      language: "CSS",
      stargazers_count: 19,
      forks_count: 2,
      html_url: "https://github.com"
    }
  ]
};

function initGitHubExplorer() {
  const form = document.getElementById('githubSearchForm');
  const input = document.getElementById('githubUsernameInput');
  const userContainer = document.getElementById('githubUserContainer');
  const reposContainer = document.getElementById('githubReposContainer');
  const loadingIndicator = document.getElementById('githubLoading');

  if (!form || !userContainer || !reposContainer) return;

  // Handler submit pencarian username
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = input.value.trim() || 'torvalds';
    await fetchGitHubData(username);
  });

  // Muat data awal (default: 'torvalds' atau pengguna contoh)
  fetchGitHubData('torvalds');

  async function fetchGitHubData(username) {
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');
    userContainer.innerHTML = '';
    reposContainer.innerHTML = '';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      // Panggil API Profil
      const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        signal: controller.signal
      });

      if (!userRes.ok) {
        throw new Error(`Pengguna GitHub tidak ditemukan atau batas API tercapai (${userRes.status})`);
      }

      const userData = await userRes.json();

      // Panggil API Repositori
      const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const reposData = reposRes.ok ? await reposRes.json() : [];

      renderUserProfile(userData);
      renderUserRepos(reposData);

      if (typeof showToast === 'function') {
        showToast(`Berhasil memuat repositori dari GitHub (@${userData.login})`);
      }
    } catch (error) {
      console.warn("Menggunakan data demonstrasi GitHub:", error.message);
      
      // Render fallback data Firman Maulana Firdauz
      renderUserProfile(mockGitHubData.user, true);
      renderUserRepos(mockGitHubData.repos, true);

      if (typeof showToast === 'function') {
        showToast(`Menampilkan mode simulasi data API (@${username})`);
      }
    } finally {
      if (loadingIndicator) loadingIndicator.classList.add('hidden');
    }
  }

  function renderUserProfile(user, isMock = false) {
    userContainer.innerHTML = `
      <div class="flex flex-col sm:flex-row items-center gap-6 bg-[#F6F2EA] dark:bg-[#1B1917] border border-[#E6DFD3] dark:border-[#2F2C27] rounded p-6 mb-8 transition-colors">
        <img class="w-20 h-20 rounded-full border-2 border-gold-500 object-cover shadow-md flex-shrink-0" src="${user.avatar_url}" alt="${user.name || user.login}" onerror="this.src='https://via.placeholder.com/80'">
        <div class="flex-1 text-center sm:text-left">
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1.5">
            <h4 class="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">${escapeHTML(user.name || user.login)}</h4>
            <span class="px-2.5 py-0.5 rounded text-xs font-semibold bg-gold-100 dark:bg-gold-900/40 text-gold-800 dark:text-gold-300 border border-gold-300 dark:border-gold-700">@${user.login}</span>
            ${isMock ? '<span class="px-2.5 py-0.5 rounded text-xs font-semibold bg-stone-700 text-white">Simulasi Demo Firman</span>' : ''}
          </div>
          <p class="text-sm text-stone-600 dark:text-stone-300 mb-3">${escapeHTML(user.bio || 'Tidak ada biodata publik.')}</p>
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-500 dark:text-stone-400">
            <span><strong class="text-stone-800 dark:text-stone-200">${user.public_repos ?? 0}</strong> Repositori</span>
            <span>•</span>
            <span><strong class="text-stone-800 dark:text-stone-200">${user.followers ?? 0}</strong> Pengikut</span>
            <span>•</span>
            <a href="${user.html_url}" target="_blank" rel="noopener noreferrer" class="text-gold-500 hover:text-gold-600 font-semibold inline-flex items-center gap-1">Buka Profil GitHub ↗</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderUserRepos(repos, isMock = false) {
    if (!repos || repos.length === 0) {
      reposContainer.innerHTML = `
        <div class="col-span-full text-center py-8 text-stone-500 dark:text-stone-400">
          <p>Tidak ada repositori publik yang ditemukan untuk akun ini.</p>
        </div>
      `;
      return;
    }

    reposContainer.innerHTML = repos.map(repo => {
      const language = repo.language || 'Code';
      const description = repo.description || 'Proyek open-source dengan dokumentasi kode bersih dan terstruktur.';
      
      return `
        <div class="bg-white dark:bg-[#201E1B] border border-[#E6DFD3] dark:border-[#2F2C27] hover:border-gold-500 rounded p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-sm">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <h4 class="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 break-words">${escapeHTML(repo.name)}</h4>
              <span class="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded bg-gold-100 dark:bg-gold-900/40 text-gold-700 dark:text-gold-300 border border-gold-300 dark:border-gold-700">Public</span>
            </div>
            <p class="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 mb-4 leading-relaxed">${escapeHTML(description)}</p>
          </div>
          <div class="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-3 border-t border-[#E6DFD3] dark:border-[#2F2C27]">
            <span class="inline-flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-gold-500"></span>
              ${escapeHTML(language)}
            </span>
            <div class="flex items-center gap-3">
              <span>⭐ ${repo.stargazers_count ?? 0}</span>
              <span>🍴 ${repo.forks_count ?? 0}</span>
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-gold-500 hover:text-gold-600 font-semibold">Lihat ↗</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
