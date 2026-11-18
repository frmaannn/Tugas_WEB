# Portofolio Pemrograman Web — Firman Maulana Firdauz

Website portofolio multi-halaman dengan desain **Clean, Classic & Minimalist** yang rapi, profesional, dan nyaman dibaca tanpa elemen visual yang berlebihan. Dilengkapi dengan **sistem login di awal** untuk autentikasi sesi sebelum masuk ke halaman portofolio.

- **Nama**: Firman Maulana Firdauz
- **Program Studi**: Teknik Informatika
- **Perguruan Tinggi**: Universitas Muhammadiyah Malang (UMM)
- **Mata Kuliah**: Pemrograman Web

---

## Alur Masuk & Autentikasi (Login di Awal)

Sebelum mengakses halaman portofolio, pengguna/dosen penguji akan disambut oleh halaman **Login**:
- **Halaman Masuk**: `login.html`
- **Kredensial Demo**:
  - **Username**: `firman`
  - **Password**: `123456`
  - *(Tersedia juga tombol instan **"Masuk Cepat sebagai Tamu / Dosen Penguji"** untuk pengujian langsung tanpa perlu mengetik)*.
- **Proteksi Halaman**: Jika mencoba membuka `index.html`, `projects.html`, atau `contact.html` secara langsung tanpa login, sistem akan otomatis mengarahkan ke `login.html`.
- **Fitur Logout**: Terdapat tombol **"Keluar"** di navbar bagian atas untuk mengakhiri sesi dan kembali ke halaman login.

---

## Pemenuhan Spesifikasi Tugas

1. **HTML5 Semantik**:
   - Struktur dokumen standar (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), valid dan terorganisir.
2. **Tailwind CSS (Clean & Grounded)**:
   - Desain tidak mencolok berlebihan, menggunakan tata letak bersih (*clean layout*), proporsi tipografi terukur (*Playfair Display* & *Plus Jakarta Sans*), serta dukungan **Mode Gelap / Terang (Dark/Light mode)**.
3. **JavaScript (ES6+)**:
   - Sistem login & logout sesi dengan `localStorage`.
   - Filter dinamis kategori proyek tanpa reload halaman.
   - Penanganan menu navigasi mobile dan notifikasi toast.
4. **Integrasi REST API**:
   - **GitHub REST API**: Pencarian data profil dan repositori publik secara real-time via `fetch()`.
   - **Literary Quotes API**: Pengambilan kutipan sastra & filosofi secara asinkron dengan tombol muat ulang.
   - **Contact Form POST API**: Simulasi pengiriman asinkron formulir pesan dengan feedback langsung.
5. **Multi-Halaman**:
   - Terdiri dari **4 halaman** terintegrasi:
     1. `login.html` (Pintu Masuk & Autentikasi)
     2. `index.html` (Beranda & Profil Mahasiswa)
     3. `projects.html` (Karya & Live GitHub REST API Explorer)
     4. `contact.html` (Kontak & Formulir Pesan)

---

## Struktur Direktori Berkas

```
Tugas/
├── login.html           # Halaman Masuk (Login di awal dengan kredensial demo)
├── index.html           # Halaman 1: Beranda, Profil Firman Maulana, Quote API & Sorotan Karya
├── projects.html        # Halaman 2: Galeri Proyek Informatika, Filter Kategori, & Live GitHub API
├── contact.html         # Halaman 3: Formulir Pesan & Informasi Kampus UMM
├── README.md            # Dokumentasi & Panduan Proyek
├── css/
│   └── style.css        # Stylesheet pendukung (Fonts Google, Transisi Halus)
└── js/
    ├── auth.js          # Sistem login, proteksi halaman, dan logout
    ├── main.js          # Skrip umum: Mode Gelap/Terang, Menu Mobile, Back to Top, Quote API
    ├── projects.js      # Modul Live GitHub REST API & Filter Kategori Proyek
    └── contact.js       # Validasi & Integrasi Asinkron Formulir Kontak
```

---

## Cara Menjalankan Website

1. Buka berkas `login.html` langsung dari File Explorer di browser mana saja.
2. Masukkan username `firman` dan password `123456`, atau klik tombol **"Masuk Cepat sebagai Tamu / Dosen Penguji"**.
3. Anda akan diarahkan ke halaman Beranda (`index.html`) dan dapat menjelajahi seluruh fitur portofolio.
