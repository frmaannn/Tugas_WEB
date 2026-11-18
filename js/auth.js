/**
 * ===================================================================
 * SISTEM AUTENTIKASI LOGIN SEDERHANA
 * Mengelola status login, proteksi halaman, dan logout
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const isLoginPage = window.location.pathname.endsWith('login.html');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoginPage) {
    // Jika sudah login dan membuka login.html, arahkan langsung ke index.html
    if (isLoggedIn) {
      window.location.replace('index.html');
      return;
    }
    initLoginForm();
  } else {
    // Di halaman utama (index, projects, contact), cek status login
    if (!isLoggedIn) {
      // Belum login -> arahkan ke login.html
      window.location.replace('login.html');
      return;
    }
    initLogoutHandler();
  }
});

/* =========================================================
   1. HANDLER FORMULIR LOGIN
   ========================================================= */
function initLoginForm() {
  const form = document.getElementById('loginForm');
  const errorBox = document.getElementById('loginError');
  const guestBtn = document.getElementById('guestLoginBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('username').value.trim();
      const passwordInput = document.getElementById('password').value.trim();

      // Validasi input
      if (!usernameInput || !passwordInput) {
        showError('Mohon isi username dan kata sandi.');
        return;
      }

      // Kriteria login sederhana (bisa username 'firman' atau kredensial apa pun yang valid)
      if (passwordInput.length < 3) {
        showError('Kata sandi minimal 3 karakter.');
        return;
      }

      // Berhasil login
      executeLogin(usernameInput);
    });
  }

  if (guestBtn) {
    guestBtn.addEventListener('click', () => {
      executeLogin('Dosen Penguji / Tamu');
    });
  }

  function showError(msg) {
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.classList.remove('hidden');
    }
  }

  function executeLogin(name) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', name);
    window.location.replace('index.html');
  }
}

/* =========================================================
   2. HANDLER LOGOUT & TAMPILAN USER
   ========================================================= */
function initLogoutHandler() {
  const logoutBtn = document.getElementById('logoutBtn');
  const userDisplay = document.getElementById('userDisplay');
  const currentUser = localStorage.getItem('currentUser') || 'Firman';

  if (userDisplay) {
    userDisplay.textContent = currentUser;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      window.location.replace('login.html');
    });
  }
}
