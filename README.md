# Portofolio Klasik Elegan — Firman Maulana Firdauz

Website portofolio multi-halaman berdesain **Classic Elegant** yang kini sepenuhnya mengimplementasikan **Tailwind CSS**, HTML5 Semantik, JavaScript ES6+, dan integrasi REST API.

- **Nama**: Firman Maulana Firdauz
- **Program Studi**: Teknik Informatika
- **Fakultas**: Fakultas Teknik
- **Perguruan Tinggi**: Universitas Muhammadiyah Malang (UMM)
- **Mata Kuliah**: Pemrograman Web

---

## Pemenuhan Spesifikasi Tugas (Sesuai Kurikulum)

1. **HTML (HyperText Markup Language)**:
   - Menggunakan tag semantik HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Struktur dokumen bersih, validasi W3C, dan aksesibilitas ramah pembaca layar (*screen reader* / a11y).
2. **CSS (Tailwind CSS Framework)**:
   - Sepenuhnya berbasis **Tailwind CSS (Utility-First)** dengan konfigurasi tema klasik:
     - Warna kustom: `gold` (*antique gold*), `parchment` (*warm ivory*), dan `charcoal` (*deep obsidian*).
     - Tipografi serif berkelas (*Playfair Display*, *Cormorant Garamond*) dan sans-serif modern (*Plus Jakarta Sans*).
     - Tata letak responsif penuh (*mobile*, *tablet*, *desktop*).
     - **Mode Malam & Siang (Dark / Light Mode)** menggunakan strategi kelas Tailwind (`darkMode: 'class'`).
3. **JavaScript (ES6+)**:
   - Skrip Vanilla JS modular dan terstruktur rapi tanpa ketergantungan library pihak ketiga.
   - Penanganan ganti tema yang disimpan di `localStorage`.
   - Navigasi menu mobile interaktif.
   - Sistem filter kategori proyek dinamis tanpa reload halaman.
   - Sistem notifikasi *toast* beranimasi.
4. **API (Application Programming Interface)**:
   - **GitHub REST API** (`https://api.github.com/users/{username}` & `/repos`): Mengambil profil pengguna, repositori publik, bintang (stars), forks, dan bahasa pemrograman secara live.
   - **Quote of the Day REST API** (`https://dummyjson.com/quotes/random`): Mengambil kutipan filosofi secara asinkron dengan tombol muat ulang acak.
   - **Contact Form POST API** (`https://jsonplaceholder.typicode.com/posts`): Simulasi pengiriman data asinkron via metode `POST` dengan notifikasi *toast* konfirmasi.
5. **Multi-Halaman**:
   - Memiliki **3 halaman terintegrasi penuh** (melebihi batas minimal 2 halaman):
     - `index.html`: Beranda, Profil Mahasiswa UMM, 4 Pilar Keahlian, Quote API, Highlight Proyek.
     - `projects.html`: Galeri Proyek Lengkap, Filter Kategori, & Live GitHub REST API Explorer.
     - `contact.html`: Formulir Surat Masuk Tervalidasi & Informasi Kampus UMM.

---

## Struktur Direktori Berkas

```
Tugas/
├── index.html           # Halaman 1: Beranda, Profil Firman Maulana, Quote API & Sorotan Karya (Tailwind)
├── projects.html        # Halaman 2: Galeri Proyek Informatika, Filter, & Live GitHub API Explorer (Tailwind)
├── contact.html         # Halaman 3: Formulir Surat Klasik & Informasi Kampus UMM (Tailwind)
├── README.md            # Dokumentasi & Panduan Lengkap Tugas
├── css/
│   └── style.css        # Stylesheet pendukung (Fonts Google, Pola Titik Klasik, Animasi Toast)
└── js/
    ├── main.js          # Skrip umum: Mode Gelap Tailwind, Menu Mobile, Back to Top, Quote API
    ├── projects.js      # Modul Live GitHub REST API & Filter Kategori Proyek
    └── contact.js       # Validasi & Integrasi Asinkron Formulir Kontak
```

---

## Cara Menjalankan Website

1. **Buka Langsung di Peramban**:
   - Cukup klik ganda (double-click) berkas `index.html` dari File Explorer di laptop/komputer Anda.
   - Website langsung aktif dan merender seluruh kelas Tailwind CSS secara otomatis melalui CDN resmi.
2. **Atau Menggunakan Localhost**:
   - Jika membuka folder proyek di VS Code, Anda dapat klik kanan `index.html` dan memilih *Open with Live Server*.
   - Atau melalui terminal:
     ```bash
     python -m http.server 8000
     ```
     Lalu buka `http://localhost:8000` pada peramban web.
