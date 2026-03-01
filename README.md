# Nihongo Bizzare

Nihongo Bizzare adalah situs edukasi kecil untuk pemula yang ingin belajar bahasa Jepang secara tenang dan bertahap. Proyek ini dibuat sebagai web statis (HTML/CSS/JS) dengan beberapa fitur interaktif sederhana yang memanfaatkan localStorage untuk simulasi autentikasi dan penyimpanan progress.

## Tampilan & Gaya
- Desain tenang dan elegan, tema terang + dukungan dark mode.
- Font kanji handwritten untuk latihan kanji menggunakan Google Fonts (`Kosugi Maru`, `Sawarabi Mincho`).
- Komponen responsif: layout menyesuaikan desktop/tablet/mobile.

## Fitur Utama
- Halaman utama: `index.html` (materi, latihan, about)
- Login & Registrasi: `login.html`, `registrasi.html`
  - Login/Registrasi disimpan sementara di `localStorage` (simulasi, tanpa backend)
  - Integrasi Google Sign-In (ganti `YOUR_GOOGLE_CLIENT_ID_HERE` dengan Client ID Anda)
- Profile: `profile.html` — Progress, Pengaturan, Pencapaian
- Latihan interaktif (modal):
  - `Hiragana` / `Katakana` (tebak romaji)
  - `Kosakata` — quiz acak 10–20 soal (multiple-choice)
  - `Tata Bahasa` — quiz multiple-choice
  - `Kanji N5` / `N4` — user jawab romaji atau hiragana dari kanji

## Struktur File (penting)
- `index.html` — halaman utama (navbar dinamis)
- `login.html`, `registrasi.html` — halaman auth
- `profile.html` — halaman profil user
- `style.css` — styling seluruh situs (ditambah aturan untuk auth, profile, kanji)
- `script.js` — logika UI dan latihan (quiz, modal, animasi)
- `auth.js` — fungsi autentikasi ringan, localStorage helpers
- `profile.js` — logika halaman profil
- `AUTHENTICATION_README.md` — panduan Google OAuth singkat

## Cara Menjalankan Secara Lokal
1. Buka terminal di folder proyek (`d:/Project/nihongobizzare-web`), lalu jalankan server statis sederhana. Contoh Python:

```bash
python -m http.server 8000
```

2. Buka browser ke `http://localhost:8000`.

> Catatan: membuka file `index.html` secara langsung tanpa server biasanya juga bekerja, tetapi beberapa browser membatasi beberapa fitur ketika dibuka via `file://`.

## Pengaturan Google Sign-In
1. Buat Google OAuth Client ID di Google Cloud Console (Web application).
2. Tambahkan authorized origins/redirect URIs sesuai domain lokal atau hosting Anda.
3. Ganti placeholder `YOUR_GOOGLE_CLIENT_ID_HERE` di `login.html` dan `registrasi.html` dengan Client ID Anda.

## Testing Cepat (dev)
- Untuk mensimulasikan user login tanpa Google atau registrasi:

Buka DevTools → Application → Local Storage → Tambah key `user` dan `userProfile` contohnya:

```javascript
localStorage.setItem('user', JSON.stringify({ name: 'Budi', email: 'budi@example.com' }));
localStorage.setItem('userProfile', JSON.stringify({ practicesCompleted: 0, articlesRead: 0, progress: { hiragana:0, katakana:0, vocabulary:0, particles:0 } }));
```

- Setelah login ter-set, muat ulang halaman. Navbar akan menampilkan `Profile` dan `Logout`.

## Behavior Quiz yang Perlu Diketahui
- `Kosakata` (vocab) memilih acak 10–20 soal dari pool kata; setiap run berbeda.
- `Kanji` N5/N4: sistem mencoba cocokkan jawaban user terhadap map pembacaan (`KANJI_READINGS`) — menerima jawaban dalam romaji atau hiragana.
- Selesaikan quiz → `userProfile.practicesCompleted` otomatis bertambah.

## Kustomisasi & Pengembangan Lanjutan (saran)
- Ganti penyimpanan sementara (`localStorage`) dengan backend (Node/Express + DB) untuk autentikasi nyata, pengamanan password, dan sinkronisasi progress.
- Perluas `KANJI_READINGS` agar mencakup semua kanji N5/N4 (bisa impor dataset JSON dari sumber yang terpercaya).
- Tambah fitur: riwayat latihan, leaderboard, sertifikat progres, upload avatar.

## Lisensi & Catatan
- Proyek ini bersifat demo/personal. Tidak ada backend production — jangan simpan data sensitif di `localStorage`.

---
Jika Anda ingin, saya bisa:
- Menambahkan `README.md` versi Bahasa Inggris.
- Menambahkan contoh `kanji-readings.json` lengkap untuk N5.
- Menjalankan commit & push perubahan (butuh akses git di mesin Anda).

Mau lanjutkan dengan salah satu opsi di atas?