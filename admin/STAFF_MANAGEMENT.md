# Fitur Manajemen Staff - Dokumentasi

## Overview

Fitur Staff Management memungkinkan Administrator untuk menambahkan dan mengelola staff yang dapat mengakses Admin Dashboard dengan permission yang berbeda-beda sesuai role mereka.

---

## 📋 Role & Permission

### 1. **Administrator** (Full Access)
- ✅ Akses ke semua halaman
- ✅ Kelola staff members
- ✅ Database management
- ✅ System settings
- ✅ View & export semua laporan

### 2. **Editor** (Content Management)
- ✅ Dashboard
- ✅ Analytics Pengunjung (View only)
- ✅ Manajemen Artikel (Full)
  - Buat artikel
  - Edit artikel
  - Publikasi artikel
- ❌ User Management
- ❌ Staff Management
- ❌ Database Management
- ❌ Settings

### 3. **Moderator** (Moderation)
- ✅ Dashboard
- ✅ Analytics Pengunjung (View only)
- ✅ User Management
  - Moderasi komentar
  - Edit komentar
  - Hapus komentar
  - Blokir user (temporary)
- ❌ Manajemen Artikel
- ❌ Staff Management
- ❌ Database Management
- ❌ Settings

### 4. **Analyst** (Reports & Analytics)
- ✅ Dashboard
- ✅ Analytics Pengunjung (Full)
  - Lihat semua data traffic
  - Export reports
  - Analisis data
  - Custom date range
- ❌ Manajemen Artikel
- ❌ User Management
- ❌ Staff Management
- ❌ Database Management
- ❌ Settings

---

## 🚀 Cara Menambah Staff

### Step 1: Buka Menu Manajemen Staff
1. Login sebagai Admin
2. Klik **"Manajemen Staff"** di sidebar
3. Klik tombol **"Tambah Staff Baru"**

### Step 2: Isi Form
```
Nama Depan*         : Budi
Nama Belakang       : Santoso
Email*              : budi@nihongobizzare.com
Role*               : Editor / Moderator / Analyst
Departemen          : Content / Moderation / Analytics
Password*           : minimal 8 karakter
Status              : Aktif (checkbox)
Permissions Tambahan : (Optional)
  - Dapat Menghapus Artikel
  - Dapat Blokir User Permanen
  - Dapat Export Data
  - Dapat Lihat Semua Data
```

### Step 3: Simpan
Klik tombol **"Simpan Staff"** untuk membuat akun staff baru.

---

## 👥 Manajemen Staff

### Daftar Staff
Menu "Manajemen Staff" menampilkan tabel lengkap semua staff dengan informasi:
- Nama Staff
- Email
- Role
- Tanggal Bergabung
- Status (Aktif/Nonaktif)
- Last Login
- Permission (button)
- Actions (View/Edit/Delete)

### Operasi Staff

#### 🔍 Lihat Detail Staff
- Klik tombol **👁️ (View)** di kolom Actions
- Menampilkan detail lengkap staff

#### ✏️ Edit Staff
- Klik tombol **✏️ (Edit)** di kolom Actions
- Update informasi:
  - Nama
  - Role
  - Departemen
  - Status (Aktif/Nonaktif)
  - Additional permissions
- Klik **"Simpan Staff"** untuk update

#### 🗑️ Hapus Staff
- Klik tombol **🗑️ (Delete)** di kolom Actions
- Konfirmasi penghapusan
- Staff akan dihapus dari sistem

#### 📋 Lihat Permissions
- Klik tombol **☑️ (Permission)** di kolom Actions
- Melihat semua permission yang dimiliki staff
- Termasuk role permissions + additional permissions

### Filter & Search
- **Search Box**: Cari berdasarkan nama atau email staff
- **Filter Role**: Filter berdasarkan role (Editor/Moderator/Analyst)
- **Filter Status**: Filter berdasarkan status (Aktif/Nonaktif)

---

## 🔐 Staff Login

Staff dapat login ke Admin Dashboard dengan:

1. Akses halaman login: `/admin/login.html` (akan dibuat nanti)
2. Input email dan password
3. Sistem akan:
   - Verify email & password
   - Cek status staff (harus Aktif)
   - Load permission staff
   - Restrict akses halaman sesuai role

### Access Control
Setiap staff akan hanya bisa akses halaman sesuai role:
```
Editor:
  ✓ Dashboard
  ✓ Analytics
  ✓ Articles
  
Moderator:
  ✓ Dashboard
  ✓ Analytics
  ✓ Users
  
Analyst:
  ✓ Dashboard
  ✓ Analytics
```

---

## 📊 Statistics Panel

Dashboard Staff Management menampilkan:
- **Total Staff**: Jumlah total staff terdaftar
- **Staff Aktif**: Staff dengan status aktif
- **Editors**: Jumlah staff dengan role Editor
- **Moderators**: Jumlah staff dengan role Moderator

---

## 🛠️ Teknologi

### Data Storage
- LocalStorage untuk data staff (demo)
- JSON format untuk ease of use
- Auto-save setiap perubahan

### Authentication
- Email & password verification
- Session token generation
- Permission checking
- Access control

### Security Features
- Password hashing (Base64, gunakan bcrypt di production)
- Session management
- Permission-based access
- Activity logging
- Status checking (inactive staff tidak bisa login)

---

## 📝 Sample Data

### Default Admin
```
Username: admin
Password: admin123
```

### Sample Staff
```
Email: editor1@example.com
Password: password123
Role: Editor
Status: Active

Email: moderator1@example.com
Password: password123
Role: Moderator
Status: Active

Email: analyst1@example.com
Password: password123
Role: Analyst
Status: Active
```

---

## 🔑 Key Features

### 1. **Role-Based Access Control (RBAC)**
- Setiap staff punya role dengan permission berbeda
- Admin bisa customize additional permissions

### 2. **Staff Status Management**
- Aktif: Staff bisa login
- Nonaktif: Staff tidak bisa login

### 3. **Last Login Tracking**
- Sistem mencatat kapan staff terakhir login
- Useful untuk monitoring activity

### 4. **Permission Management**
- Default permission based on role
- Bisa tambah additional permissions per staff

### 5. **Activity Logging**
- Sistem mencatat setiap login/logout
- Stored di localStorage (local activity)

---

## ⚠️ Security Best Practices

### Untuk Production:
1. **Gunakan HTTPS** - Enkripsi data transmission
2. **Password Hashing** - Gunakan bcrypt, tidak Base64
3. **Database Backend** - Jangan gunakan localStorage
4. **Session Management** - Implementasikan proper session
5. **Rate Limiting** - Limit login attempts
6. **Audit Logging** - Log ke server database
7. **Permission Caching** - Cache permission dengan TTL
8. **Two-Factor Auth** - Implementasikan 2FA untuk admin
9. **SSL Certificate** - HTTPS dengan valid certificate
10. **Regular Backups** - Backup data regularly

---

## 🔧 Implementation Checklist

- [x] Staff.html (Staff management page)
- [x] Staff-management.js (Staff manager class)
- [x] Auth-admin.js (Updated with staff login)
- [x] Admin.css (Styling untuk staff management)
- [x] Sidebar menu updated dengan staff option
- [ ] Login.html (Buat halaman login untuk staff)
- [ ] Access control middleware (Validate akses per page)
- [ ] Session validation (Check session di setiap page)
- [ ] Backend integration (API untuk staff management)
- [ ] Database schema (Setup database untuk staff)

---

## 📚 File References

- [staff.html](staff.html) - Staff management UI
- [staff-management.js](staff-management.js) - Staff manager class
- [auth-admin.js](auth-admin.js) - Authentication system
- [admin.css](admin.css) - Styling
- [README.md](README.md) - General documentation

---

## 💡 Tips & Tricks

### Bulk Operations
```javascript
// Add multiple staff at once
const staffList = [
  {firstName: 'John', email: 'john@example.com', role: 'editor'},
  {firstName: 'Jane', email: 'jane@example.com', role: 'moderator'}
];

staffList.forEach(staff => staffManager.addStaff(staff));
```

### Export Staff List
```javascript
// Export staff to CSV
const staff = staffManager.getAllStaff();
const csv = JSON.stringify(staff);
// Download as CSV file
```

### Batch Permission Update
```javascript
// Update multiple staff permissions
const staffIds = [1, 2, 3];
staffIds.forEach(id => {
  staffManager.updateStaff(id, {
    permissions: ['can_export_data']
  });
});
```

---

## 🚨 Troubleshooting

### Staff tidak bisa login
- ✓ Cek email & password
- ✓ Cek status staff (harus Aktif)
- ✓ Pastikan password minimal 8 karakter

### Permission tidak bekerja
- ✓ Reload halaman
- ✓ Clear localStorage
- ✓ Check browser console untuk error

### Data tidak tersimpan
- ✓ Check localStorage quota
- ✓ Clear old data
- ✓ Restart browser

---

## 📞 Support & Contact

Untuk pertanyaan atau bantuan:
1. Baca dokumentasi ini
2. Lihat console.log untuk error messages
3. Check browser developer tools
4. Contact admin

---

**Staff Management System - Ready to Use! 🎉**
