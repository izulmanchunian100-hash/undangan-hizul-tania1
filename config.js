/* ============================================================
   EDIT FILE INI SAJA untuk mengganti isi undangan.
   Bagian yang dikosongkan ('') otomatis disembunyikan.
   ============================================================ */
window.CONFIG = {
  defaultGuest: 'Tamu Undangan',

  groom: { name: 'Hizul Wahyudin', photo: 'assets/img/hizul.jpg', father: '', mother: '' },
  bride: { name: 'Tania Renata',   photo: 'assets/img/tania.jpg', father: '', mother: '' },
  couplePhoto: 'assets/img/berdua.jpg',

  event: {
    title: 'Akad Nikah & Resepsi Pernikahan',
    start: '2026-07-03T09:00:00+07:00', // format ISO. Hari otomatis dihitung dari tanggal ini.
    durationHours: 4,
    timeLabel: '09:00 WIB',
    place: 'Rumah Mempelai Wanita',
    address: 'Karang Bahagia, kec karang bahagia'
  },

  music: 'assets/audio/musik.mp3', // kosongkan '' bila belum ada

  story: [
    { title: 'The Beginning', sub: 'Awal Bertemu', date: '', photo: '',
      text: 'Berawal dari tempat kerja yang sama, Hizul dan Tania dipertemukan dalam sebuah cerita sederhana. Hizul jatuh hati lebih dulu, menyimpan rasa, dan memilih untuk tetap menunggu Tania. Baginya, cinta bukan tentang siapa yang datang lebih dulu, melainkan tentang kesungguhan untuk bertahan hingga waktu mempertemukan mereka pada jawaban yang tepat.' },
    { title: 'The Journey', sub: 'Perjalanan Bersama', date: '', photo: '',
      text: 'Dari pertemuan sederhana, tumbuh harapan untuk melangkah bersama.' },
    { title: 'The Promise', sub: 'Janji Selamanya', date: '', photo: '',
      text: 'Sebuah janji untuk saling menjaga, mencintai, dan memilih satu sama lain hingga selamanya. 🤍' }
  ],

  // Daftar foto galeri. Foto yang tidak ditemukan otomatis disembunyikan.
  gallery: [
    'assets/img/galeri-1.jpg', 'assets/img/galeri-2.jpg', 'assets/img/galeri-3.jpg',
    'assets/img/galeri-4.jpg', 'assets/img/galeri-5.jpg', 'assets/img/galeri-6.jpg'
  ],

  rsvp: { whatsapp: '6283861747832' }, // format internasional tanpa + atau 0 di depan

  gift: { bank: 'Bank Mandiri', number: '1670004172192', holder: 'Hizul Wahyudin' }
};
