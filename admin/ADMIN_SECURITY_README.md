# Admin Login Security System

## Sistem Login Admin dengan Keamanan Super Tinggi

Sistem login admin ini dirancang dengan lapisan keamanan multiple untuk melindungi akses ke dashboard administrator.

### Fitur Keamanan

#### 🔐 Enkripsi End-to-End
- Password di-hash menggunakan SHA-256 dengan salt
- Session data dienkripsi menggunakan AES
- CSRF token untuk mencegah cross-site request forgery

#### 🛡️ Rate Limiting & Account Lockout
- Maksimal 5 percobaan login gagal
- Lockout otomatis selama 15 menit setelah terlalu banyak percobaan
- Tracking percobaan login dengan localStorage

#### ⏰ Session Management
- Session timeout 30 menit
- Auto-extend session pada aktivitas user
- Validasi session integrity secara real-time
- Secure logout dengan cleanup data sensitif

#### 🔍 Input Validation & Sanitization
- Validasi real-time untuk username dan password
- Sanitasi input untuk mencegah XSS
- Password strength requirements (minimal 8 karakter)

#### 📊 Security Monitoring
- Logging semua aktivitas login/logout
- Tracking IP address dan User-Agent
- Session logs untuk audit trail

### Cara Menggunakan

#### Login ke Dashboard Admin

1. Buka `admin/admin-login.html` di browser
2. Masukkan kredensial:
   - **Username:** `admin`
   - **Password:** `admin123Secure!@#`
3. Klik "Masuk ke Dashboard"

#### Kredensial Default (UNTUK TESTING SAJA)
```
Username: admin
Password: admin123Secure!@#
```

⚠️ **PENTING:** Ubah kredensial default ini di production environment!

### File Sistem

#### `admin-login.html`
Halaman login dengan UI modern dan validasi keamanan client-side.

#### `auth-admin.js`
- Class `AdminAuthSystem` dengan fitur keamanan enhanced
- Enkripsi session menggunakan CryptoJS
- Rate limiting dan account lockout
- CSRF protection

#### `index.html` (Dashboard)
- Validasi session otomatis
- Redirect ke login jika belum authenticated
- Logout aman dengan cleanup

### Dependencies

```html
<!-- CryptoJS untuk enkripsi -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

<!-- Font Awesome untuk icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### Konfigurasi Keamanan

#### Mengubah Kredensial Admin

Edit fungsi `validateSecureAdminCredentials` di `auth-admin.js`:

```javascript
validateSecureAdminCredentials(username, password) {
    const validUsername = 'your_admin_username';
    const validPasswordPlain = 'your_secure_password';
    const expectedHash = CryptoJS.SHA256(validPasswordPlain + validUsername).toString();

    return username === validUsername && password === expectedHash;
}
```

#### Mengubah Pengaturan Keamanan

```javascript
class AdminAuthSystem {
    constructor() {
        this.sessionTimeout = 30 * 60 * 1000; // 30 menit
        this.maxLoginAttempts = 5; // Maksimal percobaan
        this.lockoutDuration = 15 * 60 * 1000; // 15 menit lockout
    }
}
```

### Testing Keamanan

#### Test Rate Limiting
1. Coba login dengan kredensial salah 5 kali
2. Sistem akan lockout selama 15 menit

#### Test Session Timeout
1. Login berhasil
2. Biarkan browser idle selama 30 menit
3. Sistem akan auto-logout

#### Test CSRF Protection
1. Coba manipulasi CSRF token di form
2. Login akan gagal dengan pesan error

### Troubleshooting

#### Masalah: "Token keamanan tidak valid"
- **Solusi:** Refresh halaman untuk generate CSRF token baru

#### Masalah: "Akun terkunci"
- **Solusi:** Tunggu 15 menit atau clear localStorage

#### Masalah: "Sesi berakhir"
- **Solusi:** Login kembali

### Best Practices

1. **Selalu gunakan HTTPS** di production
2. **Ubah kredensial default** segera
3. **Monitor session logs** secara berkala
4. **Implementasi 2FA** untuk lapisan keamanan tambahan
5. **Backup dan recovery** untuk data penting
6. **Regular security audits**

### Future Enhancements

- [ ] Two-Factor Authentication (2FA)
- [ ] Biometric login
- [ ] Password reset via email
- [ ] Login attempt notifications
- [ ] Geographic login restrictions
- [ ] Device fingerprinting

---

**Dikembangkan dengan ❤️ untuk keamanan maksimal**