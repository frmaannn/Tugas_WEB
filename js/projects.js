/**
 * ===================================================================
 * PROJECTS & GITHUB REST API MODULE
 * Firman Maulana Firdauz (Informatika UMM)
 * Tampilan: Bersih, Rapi, Fungsional (Tailwind CSS)
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initGitHubExplorer();
});

/* =========================================================
   1. FILTER KATEGORI PROYEK
   ========================================================= */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-stone-900', 'text-white', 'dark:bg-stone-100', 'dark:text-stone-900');
        b.classList.add('bg-white', 'dark:bg-[#201E1B]', 'text-stone-600', 'dark:text-stone-300', 'border-stone-200', 'dark:border-stone-800');
      });

      btn.classList.remove('bg-white', 'dark:bg-[#201E1B]', 'text-stone-600', 'dark:text-stone-300');
      btn.classList.add('bg-stone-900', 'text-white', 'dark:bg-stone-100', 'dark:text-stone-900');

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
   2. LIVE GITHUB REST API
   ========================================================= */
const mockGitHubData = {
  user: {
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    name: "Firman Maulana Firdauz",
    login: "firmanmf",
    bio: "Mahasiswa Teknik Informatika Universitas Muhammadiyah Malang (UMM).",
    public_repos: 12,
    followers: 65,
    html_url: "https://github.com"
  },
  repos: [
    {
      name: "tugas-web-portfolio",
      description: "Website portofolio tugas pemrograman web berbasis Tailwind CSS, Vanilla JS, dan REST API publik.",
      language: "JavaScript",
      stargazers_count: 24,
      forks_count: 5,
      html_url: "https://github.com"
    },
    {
      name: "informatika-lab-umm",
      description: "Modul praktikum dan latihan pemrograman web di Program Studi Informatika UMM.",
      language: "HTML",
      stargazers_count: 18,
      forks_count: 3,
      html_url: "https://github.com"
    },
    {
      name: "quotes-fetcher-api",
      description: "Konsumsi REST API kutipan sastra dunia menggunakan fetch() asinkron dan fallback data lokal.",
      language: "JavaScript",
      stargazers_count: 15,
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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = input.value.trim() || 'torvalds';
    await fetchGitHubData(username);
  });

  // Muat data awal
  fetchGitHubData('torvalds');

  async function fetchGitHubData(username) {
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');
    userContainer.innerHTML = '';
    reposContainer.innerHTML = '';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        signal: controller.signal
      });

      if (!userRes.ok) {
        throw new Error(`User tidak ditemukan atau limit API (${userRes.status})`);
      }

      const userData = await userRes.json();

      const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const reposData = reposRes.ok ? await reposRes.json() : [];

      renderUserProfile(userData);
      renderUserRepos(reposData);

      if (typeof showToast === 'function') {
        showToast(`Memuat data GitHub (@${userData.login})`);
      }
    } catch (error) {
      console.warn("Menggunakan data simulasi:", error.message);
      renderUserProfile(mockGitHubData.user, true);
      renderUserRepos(mockGitHubData.repos, true);
      if (typeof showToast === 'function') {
        showToast(`Mode data contoh (@${username})`);
      }
    } finally {
      if (loadingIndicator) loadingIndicator.classList.add('hidden');
    }
  }

  function renderUserProfile(user, isMock = false) {
    userContainer.innerHTML = `
      <div class="flex items-center gap-4 p-4 mb-5 rounded bg-[#FAF9F5] dark:bg-[#141312] border border-stone-200 dark:border-stone-800">
        <img class="w-14 h-14 rounded-full border border-stone-300 dark:border-stone-700 object-cover flex-shrink-0" src="${user.avatar_url}" alt="${user.name || user.login}" onerror="this.src='https://via.placeholder.com/60'">
        <div class="flex-1 text-xs">
          <div class="flex items-center gap-2 mb-1">
            <h4 class="font-bold text-sm text-stone-900 dark:text-stone-100">${escapeHTML(user.name || user.login)}</h4>
            <span class="text-[10px] text-stone-500 font-mono">@${user.login}</span>
            ${isMock ? '<span class="px-1.5 py-0.5 rounded text-[10px] bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">Simulasi</span>' : ''}
          </div>
          <p class="text-stone-600 dark:text-stone-400 mb-1.5">${escapeHTML(user.bio || 'Tidak ada biodata.')}</p>
          <div class="flex gap-3 text-stone-500">
            <span><strong>${user.public_repos ?? 0}</strong> Repositori</span>
            <span>•</span>
            <span><strong>${user.followers ?? 0}</strong> Followers</span>
            <span>•</span>
            <a href="${user.html_url}" target="_blank" rel="noopener noreferrer" class="text-gold-600 dark:text-gold-400 hover:underline">Buka Profil ↗</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderUserRepos(repos, isMock = false) {
    if (!repos || repos.length === 0) {
      reposContainer.innerHTML = `
        <div class="col-span-full text-center py-6 text-xs text-stone-400">
          Tidak ada repositori publik yang ditemukan.
        </div>
      `;
      return;
    }

    reposContainer.innerHTML = repos.map(repo => {
      const language = repo.language || 'Code';
      const description = repo.description || 'Repositori kode terbuka dengan dokumentasi terstruktur.';
      
      return `
        <div class="p-4 bg-[#FAF9F5] dark:bg-[#141312] border border-stone-200 dark:border-stone-800 rounded flex flex-col justify-between hover:border-stone-400 transition-colors">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1">
              <h4 class="font-bold text-xs text-stone-900 dark:text-stone-100 break-words">${escapeHTML(repo.name)}</h4>
              <span class="text-[9px] uppercase font-mono px-1 py-0.5 bg-stone-200 dark:bg-stone-800 rounded text-stone-600 dark:text-stone-400">Public</span>
            </div>
            <p class="text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2 mb-3 leading-relaxed">${escapeHTML(description)}</p>
          </div>
          <div class="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-200 dark:border-stone-800">
            <span class="text-stone-600 dark:text-stone-300 font-mono text-[10px]">${escapeHTML(language)}</span>
            <div class="flex items-center gap-2.5">
              <span>⭐ ${repo.stargazers_count ?? 0}</span>
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-gold-600 dark:text-gold-400 font-medium">Buka ↗</a>
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
