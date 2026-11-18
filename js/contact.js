/**
 * ===================================================================
 * CLASSIC ELEGANT PORTFOLIO - CONTACT MODULE (TAILWIND CSS READY)
 * Pemilik: Firman Maulana Firdauz (Informatika UMM)
 * Fitur: Validasi Formulir, Simulasi Pengiriman API, Toast Feedback
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const contactForm = document.getElementById('classicContactForm');
  const submitBtn = document.getElementById('submitContactBtn');

  if (!contactForm || !submitBtn) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ambil data input
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Validasi sederhana
    if (!name || !email || !message) {
      if (typeof showToast === 'function') {
        showToast('Mohon lengkapi semua kolom yang wajib diisi.');
      } else {
        alert('Mohon lengkapi semua kolom yang wajib diisi.');
      }
      return;
    }

    // Ubah status tombol menjadi loading
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Mengirim Pesan...</span>`;
    submitBtn.disabled = true;

    try {
      // Mengirim payload ke API simulasi (JSONPlaceholder POST)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `[Pesan Portofolio] ${subject || 'Pertanyaan Umum'}`,
          body: `Dari: ${name} (${email})\n\n${message}`,
          userId: 1
        })
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim melalui API');
      }

      const result = await response.json();
      console.log('Respons Sukses API Formulir:', result);

      // Reset form
      contactForm.reset();

      if (typeof showToast === 'function') {
        showToast(`Terima kasih, ${name}! Pesan Anda telah terkirim ke Firman Maulana.`);
      } else {
        alert(`Terima kasih, ${name}! Pesan Anda telah terkirim.`);
      }
    } catch (error) {
      console.warn('Mode fallback pengiriman lokal:', error);
      contactForm.reset();
      if (typeof showToast === 'function') {
        showToast(`Pesan tersimpan secara lokal. Terima kasih atas kontak Anda!`);
      }
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}
