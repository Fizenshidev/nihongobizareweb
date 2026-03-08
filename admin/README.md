# Admin Panel Dashboard - Dokumentasi

## Struktur Folder Admin Panel

```
admin/
├── index.html              # Dashboard utama
├── analytics.html          # Analytics pengunjung
├── articles.html           # Manajemen artikel
├── users.html              # Manajemen pengguna
├── database.html           # Manajemen database
├── settings.html           # Pengaturan admin
├── admin.css               # Styling admin panel
├── admin.js                # JavaScript admin panel
├── assets/                 # Folder aset
└── data/                   # Folder data/backup
```

---

## Fitur-Fitur Admin Panel

### 1. **Dashboard** (index.html)
   - **Overview** dengan statistik real-time:
     - Total Pengunjung
     - Pengguna Terdaftar
     - Total Artikel
     - Aktivitas Hari Ini
   - **Charts & Graphs**:
     - Grafik pengunjung per hari
     - Pie chart sumber traffic
   - **Aktivitas Terbaru**: Menampilkan aktivitas pengguna terakhir

### 2. **Analytics Pengunjung** (analytics.html)
   - Monitoring traffic website
   - Filter periode waktu (7 hari, 30 hari, 90 hari, semua waktu)
   - Key metrics:
     - Total Sesi
     - Pengunjung Unik
     - Rata-rata Sesi
     - Bounce Rate
   - **Visualisasi Data**:
     - Traffic Harian
     - Device Pengunjung (Desktop/Mobile/Tablet)
     - Browser Teratas
     - Lokasi Pengunjung
   - **Export Laporan**: Unduh laporan dalam berbagai format

### 3. **Manajemen Artikel** (articles.html)
   - **Upload Article**: Form untuk menambah artikel baru
   - **Edit Article**: Ubah konten artikel yang sudah ada
   - **Delete Article**: Hapus artikel
   - **Kategori**: Hiragana, Katakana, Grammar, Vocabulary, Particles, Budaya
   - **Tabel Artikel** dengan informasi:
     - Judul
     - Kategori
     - Penulis
     - Tanggal Publikasi
     - Status (Draft/Dipublikasikan)
     - Jumlah Views
   - **Filter & Search**: Cari artikel berdasarkan judul atau kategori

### 4. **User Management** (users.html)
   - **Daftar Pengguna**: Tampilkan semua pengguna yang terdaftar
   - **Informasi Pengguna**:
     - Nama Pengguna
     - Email
     - Tanggal Bergabung
     - Status (Aktif/Nonaktif)
     - Level (Premium/Regular)
     - Aktivitas Terakhir
   - **Operasi**:
     - Lihat Detail Pengguna
     - Edit Pengguna
     - Hapus Pengguna
   - **Filter & Search**: Cari pengguna berdasarkan nama atau email
   - **Pagination**: Navigasi antar halaman

### 6. **Manajemen Staff** (staff.html)
   - **Tambah Staff**: Buat akun staff baru dengan role berbeda
   - **Edit Staff**: Ubah informasi staff
   - **Hapus Staff**: Hapus akun staff
   - **View Permissions**: Lihat detail permission staff
   - **Role Types**:
     - Editor - Upload & manage articles
     - Moderator - Moderate comments & users
     - Analyst - View analytics & export reports
   - **Permission Management**: Customize permissions per staff
   - **Activity Tracking**: Monitor last login staff
   - **Status Management**: Aktifkan/nonaktifkan staff access
   - **Statistik Database**:
     - Ukuran Database
     - Jumlah Tabel
     - Total Records
     - Waktu Backup Terakhir
   - **Operasi Database**:
     - **Backup Database**: Buat backup lengkap
     - **Restore Database**: Pulihkan dari backup
     - **Optimize Database**: Optimalkan performa
     - **Repair Database**: Perbaiki data yang rusak
   - **Daftar Tabel**: 
     - Nama Tabel
     - Jumlah Rows
     - Ukuran File
     - Tipe Database
   - **Export/Import**: Ekspor tabel ke berbagai format

### 8. **Pengaturan** (settings.html)
   - **General Settings**:
     - Nama Website
     - Deskripsi Website
     - URL Website
     - Email Admin
   - **Pengaturan Keamanan**:
     - Ubah Password
     - Two-Factor Authentication
   - **Email Settings**:
     - Konfigurasi SMTP
     - Kredensial Email
   - **Pengaturan Lanjutan**:
     - Cache Timeout
     - Mode Pemeliharaan
     - Mode Debug
     - API Key Management

---

## Cara Menggunakan

### Akses Admin Panel
1. Buka file `admin/index.html` di browser
2. Atau tambahkan link ke admin panel di menu navigasi utama

### Menambah Artikel
1. Ke menu "Manajemen Artikel"
2. Klik tombol "Artikel Baru"
3. Isi form dengan:
   - Judul Artikel
   - Kategori
   - Penulis
   - Konten
   - Gambar/Thumbnail (opsional)
   - Tags
4. Klik "Simpan Artikel"

### Monitoring Pengunjung
1. Ke menu "Analytics Pengunjung"
2. Pilih periode waktu
3. Lihat grafik dan statistik traffic
4. Klik "Export Laporan" untuk mengunduh data

### Manajemen Database
1. Ke menu "Database"
2. Pilih operasi yang diinginkan:
   - Backup: Klik "Backup Sekarang"
   - Restore: Klik "Pilih File"
   - Optimize: Klik "Jalankan"
   - Repair: Klik "Perbaiki"

---

## Integrasi dengan Backend

Untuk fungsi penuh, integrasikan dengan backend server:

### Contoh Integrasi Node.js/Express:

```javascript
// routes/admin.js
app.post('/admin/articles', (req, res) => {
    const { title, category, author, content } = req.body;
    // Simpan ke database
    res.json({ success: true, message: 'Artikel berhasil disimpan' });
});

app.get('/admin/analytics', (req, res) => {
    // Ambil data analytics dari database
    res.json(analyticsData);
});
```

---

## Customization

### Mengubah Warna
Edit variabel di `admin.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48c774;
    /* ... */
}
```

### Menambah Menu Sidebar
Edit `admin.html` dan tambahkan di `sidebar-nav`:
```html
<li><a href="newpage.html" class="nav-item"><i class="fas fa-icon"></i> Menu Baru</a></li>
```

---

## Security Notes

⚠️ **Penting**: 
- Implementasikan autentikasi yang kuat sebelum mengakses admin panel
- Gunakan HTTPS untuk semua komunikasi
- Validasi input semua form di server-side
- Implementasikan rate limiting untuk database operations
- Gunakan environment variables untuk kredensial sensitif

---

## Browser Compatibility

✅ Chrome/Edge
✅ Firefox
✅ Safari
✅ Mobile Browsers (Responsive Design)

---

## Dependencies

- Font Awesome 6.4.0 (Icons)
- Chart.js 3.9.1 (Data Visualization)
- Google Fonts (Poppins, Sawarabi Mincho)

---

## Support

Untuk bantuan lebih lanjut, harap hubungi tim support.
