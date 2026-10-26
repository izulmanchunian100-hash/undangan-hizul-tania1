# Undangan Digital Hizul & Tania

Website undangan statis (HTML, CSS, JS) bertema royal blue dan emas: pintu istana 3D, cahaya bercahaya, frame bunga dan pohon, serta burung terbang. Tanpa build tool, cukup upload ke GitHub Pages.

## Struktur

```
index.html          halaman utama
css/style.css       tampilan dan animasi
js/config.js        SEMUA isi yang perlu Anda edit
js/main.js          logika (tidak perlu diubah)
assets/img/         foto
assets/audio/       musik
```

## 1. Isi data di `js/config.js`

- Nama orang tua: isi `father` dan `mother`. Jika kosong, barisnya otomatis disembunyikan.
- Tanggal acara: ubah `event.start` (format `2026-07-03T09:00:00+07:00`). Nama hari dihitung otomatis dari tanggal ini.
- Bagian yang dikosongkan (rekening, galeri, cerita) otomatis disembunyikan.

## 2. Tambahkan foto asli

Letakkan di `assets/img/` dengan nama persis seperti ini (atau ubah nama di `config.js`):

| File | Fungsi |
|---|---|
| `hizul.jpg` | foto mempelai pria (rasio portrait 3:4) |
| `tania.jpg` | foto mempelai wanita (portrait 3:4) |
| `berdua.jpg` | foto bersama (opsional) |
| `galeri-1.jpg` … `galeri-6.jpg` | galeri |
| `cover.jpg` | pratinjau saat link dibagikan di WhatsApp |

Kompres foto dulu (lebar maksimal 1600 px, ukuran sekitar 300 KB per foto) lewat squoosh.app agar website cepat dibuka.

## 3. Tambahkan musik

Taruh file di `assets/audio/musik.mp3`. Musik baru diputar setelah tamu menekan "Buka Undangan". Pastikan Anda punya izin pakai lagu tersebut jika undangan dipublikasikan. Jika file tidak ada, tombol musik otomatis nonaktif dan website tetap berfungsi.

## 4. Upload ke GitHub dan aktifkan GitHub Pages

1. Buat repository baru di github.com (mis. `undangan-hizul-tania`), set Public.
2. Klik **Add file > Upload files**, seret SEMUA isi folder ini (termasuk folder `css`, `js`, `assets`, dan file `.nojekyll`), lalu **Commit changes**.
3. Buka **Settings > Pages**. Pada *Build and deployment*, pilih Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)**, lalu **Save**.
4. Tunggu 1 sampai 3 menit. Link Anda: `https://USERNAME.github.io/undangan-hizul-tania/`

Setelah link jadi, ubah `og:image` di `index.html` menjadi URL penuh, misalnya `https://USERNAME.github.io/undangan-hizul-tania/assets/img/cover.jpg`, supaya gambar muncul saat dibagikan ke WhatsApp.

## 5. Link untuk setiap tamu

Tambahkan `?to=` dan nama tamu di belakang link:

```
https://USERNAME.github.io/undangan-hizul-tania/?to=Bapak%20Budi%20dan%20Keluarga
```

Spasi ditulis `%20`. Tanpa `?to=`, tampil "Tamu Undangan".

## Catatan RSVP

RSVP memakai WhatsApp: tamu mengisi form, memeriksa pesan otomatis, lalu mengirimnya ke nomor di `config.js`. Website ini TIDAK menyimpan data di database. Rekap kehadiran ada di chat WhatsApp Anda. Jika ingin daftar tamu tersimpan otomatis, perlu ditambah layanan formulir (mis. Google Forms atau Formspree).
