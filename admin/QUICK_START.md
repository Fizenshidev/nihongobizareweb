# Admin Panel - PANDUAN CEPAT

## 📋 Fitur dan Fungsi Admin Panel

Admin Panel Nihongo Bizzare dirancang untuk memantau dan mengelola website dengan mudah.

---

## 🚀 Cara Akses

### Metode 1: Direct Access
Buka URL: `d:\Project\nihongobizzare-web\admin\index.html`

### Metode 2: Tambah Menu di Navbar (Rekomendasi)
Edit `index.html` pada menu navbar:
```html
<li id="adminMenu" class="admin-menu" style="display:none;">
    <a href="admin/index.html" class="nav-link">⚙️ Admin Panel</a>
</li>
```

---

## 📊 Dashboard Utama (`admin/index.html`)

### Apa yang Ditampilkan:
- ✅ **Total Pengunjung** - Jumlah visitor website
- ✅ **Pengguna Terdaftar** - Jumlah member yang signup
- ✅ **Total Artikel** - Jumlah artikel di website
- ✅ **Aktivitas Hari Ini** - User yang aktif hari ini
- ✅ **Grafik Pengunjung** - Tren traffic 7 hari terakhir
- ✅ **Sumber Traffic** - Dari mana pengunjung datang
- ✅ **Aktivitas Terbaru** - Log aktivitas real-time

### Tombol Aksi:
- Klik dashboard stat cards untuk melihat detail
- Export data untuk analisis lebih lanjut

---

## 📈 Analytics Pengunjung (`admin/analytics.html`)

### Monitoring Pengunjung:
1. Pilih **Periode**: 7 hari / 30 hari / 90 hari / Semua waktu
2. Lihat **Key Metrics**:
   - Total Sesi
   - Pengunjung Unik
   - Rata-rata Sesi
   - Bounce Rate

### Visualisasi Data:
- 📊 **Traffic Harian** - Grafik pengunjung per hari
- 📱 **Device Pengunjung** - Desktop vs Mobile vs Tablet
- 🌐 **Browser Teratas** - Chrome, Firefox, Safari, Edge
- 🗺️ **Lokasi Pengunjung** - Geografis pengunjung

### Halaman Paling Sering Dikunjungi:
```
Menampilkan:
- Nama halaman
- Jumlah views
- Waktu rata-rata di halaman
- Bounce rate
```

### Export Laporan:
Klik **"Export Laporan"** untuk download data dalam format Excel/CSV

---

## 📝 Manajemen Artikel (`admin/articles.html`)

### Upload Artikel Baru:
1. Klik tombol **"Artikel Baru"**
2. Isi form:
   - ✏️ **Judul Artikel** (Required)
   - 📂 **Kategori**: Hiragana / Katakana / Grammar / Vocabulary / Particles / Budaya
   - ✍️ **Penulis** (Required)
   - 📄 **Konten Artikel** (Required)
   - 🖼️ **Gambar/Thumbnail** (Opsional)
   - 🏷️ **Tags** (Opsional, pisahkan dengan koma)
3. Klik **"Simpan Artikel"**

### Edit/Hapus Artikel:
- Klik tombol ✏️ (Edit) untuk mengubah
- Klik tombol 🗑️ (Hapus) untuk menghapus
- Use 🔍 Search untuk mencari artikel

### Informasi Artikel:
```
Tampilkan:
- Judul
- Kategori
- Penulis
- Tanggal Publikasi
- Status (Draft/Dipublikasikan)
- Jumlah Views
```

---

## 👥 User Management (`admin/users.html`)

### Pantau Pengguna:
- 👤 **Nama Pengguna** - Username member
- 📧 **Email** - Email address
- 📅 **Tanggal Bergabung** - Join date
- 🟢 **Status** - Aktif/Nonaktif/Pending
- 💎 **Level** - Premium/Regular
- ⏰ **Aktivitas Terakhir** - Last login

### Operasi:
- 👁️ **Lihat** - View detail profil
- ✏️ **Edit** - Ubah data pengguna
- 🗑️ **Hapus** - Delete pengguna

### Filter & Cari:
- Gunakan search box untuk mencari nama/email
- Filter berdasarkan status (Active/Inactive)
- Navigasi dengan pagination

---

## 💾 Database Management (`admin/database.html`)

### Statistik Database:
```
- Ukuran Database: Total size
- Total Tabel: Jumlah tabel
- Total Records: Total data
- Backup Terakhir: Waktu backup terakhir
```

### Operasi Database:

#### 1. **Backup Database** 💾
- Klik "Backup Sekarang"
- Buat backup lengkap database
- File disimpan di `/admin/data/backups/`

#### 2. **Restore Database** 🔄
- Klik "Pilih File"
- Upload file backup (.sql)
- Restore data dari backup

#### 3. **Optimize Database** ⚡
- Klik "Jalankan"
- Optimalkan performa database
- Bersihkan fragmentation

#### 4. **Repair Database** 🔧
- Klik "Perbaiki"
- Perbaiki data yang corrupted
- Recovery tabel yang error

### Daftar Tabel:
Tampilkan semua tabel dengan:
- Nama tabel
- Jumlah rows
- Ukuran
- Tipe (InnoDB/MyISAM)
- Export/View data

---

## ⚙️ Pengaturan (`admin/settings.html`)

### 1. **Umum** (General)
```
- Nama Website
- Deskripsi Website
- URL Website
- Email Admin
```

### 2. **Keamanan** (Security)
```
- Ubah Password Admin
- Two-Factor Authentication
- Session Management
- Login History
```

### 3. **Email** (Email Configuration)
```
- SMTP Host
- SMTP Port
- SMTP Username
- SMTP Password
- Test Email
```

### 4. **Lanjutan** (Advanced)
```
- Cache Timeout
- Mode Pemeliharaan (Maintenance Mode)
- Mode Debug
- API Key Management
- System Logs
```

---

## 🔐 Keamanan

### Login Admin:
```
Username: admin
Password: admin123
```

⚠️ **PENTING**: Ubah password default setelah setup!

### Best Practices:
- ✅ Gunakan password yang kuat
- ✅ Aktifkan Two-Factor Authentication
- ✅ Perbarui admin panel secara berkala
- ✅ Backup database secara rutin
- ✅ Monitor aktivitas login
- ✅ Gunakan HTTPS

---

## 📱 Responsive Design

Admin Panel berfungsi di:
- ✅ Desktop (Windows/Mac/Linux)
- ✅ Tablet (iPad/Android Tablet)
- ✅ Mobile (Smartphone)

Sidebar otomatis collapse di mobile untuk space lebih besar.

---

## 🎨 Navigasi

### Sidebar Menu:
```
📊 Dashboard        → Overview website
📊 Analytics        → Monitor pengunjung
📰 Manajemen Artikel → Upload/edit artikel
👥 User Management  → Kelola pengguna
💾 Database         → Backup & optimize
⚙️ Pengaturan       → System settings
🚪 Logout           → Keluar dari admin
```

Klik pada menu untuk berpindah halaman.

---

## 💡 Tips & Trik

### Notifikasi Real-time:
- Admin panel menampilkan notifikasi ketika ada aktivitas baru
- Perbarui data dengan tombol refresh

### Export Data:
- Export analytics untuk laporan bulanan
- Export artikel list untuk backup
- Simpan data dalam format Excel/CSV

### Keyboard Shortcuts:
```
(Jika diimplementasikan)
Ctrl + S  → Save/Simpan
Ctrl + B  → Backup
Ctrl + E  → Export
Ctrl + L  → Logout
```

---

## 🔧 Troubleshooting

### Halaman Tidak Load?
- Refresh browser (Ctrl + F5)
- Clear browser cache
- Cek koneksi internet

### Fitur Tidak Berfungsi?
- Pastikan JavaScript enabled
- Update browser ke versi terbaru
- Clear localStorage jika perlu reset

### Data Tidak Tersimpan?
- Cek koneksi internet
- Pastikan form terisi lengkap
- Lihat browser console untuk error message

---

## 📞 Support

Jika mengalami masalah:
1. Cek dokumentasi di `/admin/README.md`
2. Lihat database schema di `/admin/data/DATABASE_SCHEMA.md`
3. Hubungi tim support

---

## 📋 Checklist Setup

- [ ] Copy folder `admin/` ke project
- [ ] Buka `/admin/index.html` di browser
- [ ] Test semua menu (Dashboard, Analytics, Articles, Users, Database, Settings)
- [ ] Ubah password admin default
- [ ] Setup SMTP untuk email notifications
- [ ] Jalankan backup database pertama
- [ ] Test restore dari backup
- [ ] Aktifkan Two-Factor Authentication
- [ ] Setup maintenance schedule untuk database optimization
- [ ] Buat dokumentasi internal untuk tim

---

## 🎯 Next Steps

1. **Integrasikan dengan Backend**: Hubungkan admin panel dengan API server
2. **Database Connection**: Setup koneksi ke database MySQL/PostgreSQL
3. **Authentication**: Implementasikan login dengan JWT/Session
4. **Real-time Updates**: Gunakan WebSocket untuk live notifications
5. **Advanced Features**: Tambahan seperti:
   - Advanced reporting
   - Custom dashboards
   - Scheduled tasks
   - Automated backups
   - Email alerts

---

**Admin Panel siap digunakan! 🚀**

Untuk informasi lebih detail, buka README.md di folder admin.
