# Nihongo Bizzare - Login & Authentication System

Selamat datang! Berikut adalah dokumentasi lengkap untuk sistem autentikasi yang telah ditambahkan ke Nihongo Bizzare.

## 🆕 Fitur Baru

### 1. **Login Page** (`login.html`)
- Login dengan email dan password
- Google Sign-In integration
- Redirect ke halaman utama setelah login berhasil

### 2. **Registration Page** (`registrasi.html`)
- Daftar dengan email, nama, dan password
- Validasi password minimal 8 karakter
- Google Sign-In integration
- Syarat & ketentuan checkbox

### 3. **Profile Page** (`profile.html`)
Halaman profil user dengan tab-tab berikut:
- **📊 Progress**: Statistik pembelajaran (artikel dibaca, latihan selesai, hari berturut-turut, waktu belajar)
- **⚙️ Pengaturan**: Edit profil, preferensi tema, notifikasi email
- **🏆 Pencapaian**: Badge dan achievement system

### 4. **Google OAuth Integration**
- Integrasi dengan Google Sign-In
- Satu klik sign-up dan login

### 5. **Navigation Update**
- Login/Logout buttons di navbar
- Dynamic navigation berdasarkan status login
- Profile link untuk user yang sudah login

## 🚀 Cara Setup Google OAuth

### Step 1: Buat Google OAuth Project
1. Buka [Google Cloud Console](https://console.cloud.google.com)
2. Buat project baru atau pilih yang sudah ada
3. Enable **Google+ API**

### Step 2: Buat OAuth 2.0 Credentials
1. Pergi ke **Credentials** → Create Credentials → OAuth 2.0 Client ID
2. Pilih **Web Application**
3. Tambahkan Authorized redirect URIs:
   - `http://localhost:8000`
   - `http://localhost:5500`
   - `http://yourdomainname.com`
   - `https://yourdomainname.com`

### Step 3: Dapatkan Client ID
1. Copy **Client ID** Anda
2. Buka file `login.html` dan `registrasi.html`
3. Ganti `YOUR_GOOGLE_CLIENT_ID_HERE` dengan Client ID Anda

```javascript
client_id: 'YOUR_GOOGLE_CLIENT_ID_HERE'
```

## 📁 File-File Baru

### HTML Files
- **login.html** - Halaman login
- **registrasi.html** - Halaman registrasi
- **profile.html** - Halaman profil user

### JavaScript Files
- **auth.js** - Fungsi autentikasi dan localStorage management
- **profile.js** - Logika halaman profile

### CSS
- Semua styling ada di **style.css** (sudah diupdate)

## 🔐 Local Storage Structure

### User Data
```javascript
localStorage.user = {
    id: "unique_id",
    email: "user@email.com",
    name: "User Name",
    picture: "url_to_picture",
    registeredAt: "2026-03-02T..."
}
```

### User Profile
```javascript
localStorage.userProfile = {
    bio: "User biography",
    theme: "light|dark|auto",
    emailNotifications: true,
    articlesRead: 0,
    practicesCompleted: 0,
    streakDays: 0,
    totalLearningTime: 0,
    progress: {
        hiragana: 0,
        katakana: 0,
        vocabulary: 0,
        particles: 0
    }
}
```

## 🔧 Functions Penting

### Autentikasi
```javascript
isLoggedIn()                          // Check jika user sudah login
getCurrentUser()                      // Get data user saat ini
loginUser(email, password)            // Login dengan email/password
registerUser(name, email, pwd, pwd2)  // Register user baru
logoutUser()                          // Logout dan clear localStorage
requireLogin()                        // Redirect ke login jika belum login
```

### Profile
```javascript
getUserProfile()      // Get user profile settings
saveUserProfile(data) // Save profile settings
updateUserProfile({}) // Update user data
```

## 🎨 Styling

Semua halaman autentikasi menggunakan:
- Gradient backgrounds
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Smooth animations dan transitions

## 🔄 Flow Aplikasi

1. **User Baru** → `registrasi.html` → Login → `index.html`
2. **User Existing** → `login.html` → `index.html`
3. **Dari Navbar** → Klik "Profile" → `profile.html`
4. **Logout** → Hapus localStorage → `login.html`

## ⚠️ Development Notes

### Belum Di-Implement (Untuk Diperluas):
- Backend authentication (gunakan Node.js + Express)
- Database (MongoDB, Firebase, etc)
- Email verification
- Password reset
- Social media logins (Facebook, GitHub, dll)
- Two-factor authentication (2FA)
- User avatar upload

### Best Practices Saat Production:
1. **Jangan** simpan credentials langsung di localStorage
2. Gunakan **HTTP-only cookies** untuk tokens
3. Implement **JWT** atau **Session authentication**
4. Setup **HTTPS** untuk keamanan data
5. Validate semua input di **backend**
6. Hash passwords dengan **bcrypt** atau similar

## 🧪 Testing

### Test Registrasi
1. Buka `registrasi.html`
2. Isi form dengan valid email & password (min 8 karakter)
3. Submit
4. Otomatis redirect ke `index.html`
5. Cek navbar, sekarang ada Profile & Logout

### Test Login
1. Buka `login.html`
2. Isi email & password user yang sudah register
3. Submit
4. Otomatis redirect ke `index.html`

### Test Profile Page
1. Login terlebih dahulu
2. Klik "Profile" di navbar
3. Lihat user data dan stats
4. Edit pengaturan
5. Lihat progression dan achievements

### Test Google Sign-In
1. Setup Google OAuth dengan benar (lihat step di atas)
2. Klik tombol "Google Sign-In"
3. Login dengan akun Google
4. Otomatis create user & redirect ke home

## 📞 Support & Troubleshooting

### Google Sign-In tidak muncul?
- Check console untuk error messages
- Verify Client ID sudah benar di file HTML
- Check CORS settings di Google Cloud Console
- Pastikan domain sudah ditambahkan di authorized URIs

### Form validation tidak work?
- Check browser console
- Pastikan auth.js sudah ter-load
- Cek localStorage di DevTools

### Profile page blank?
- Pastikan user sudah login
- Check localStorage untuk user data
- Verify profile.js ter-load dengan baik

## 📚 Dokumentasi Lengkap

Untuk dokumentasi lebih detail, lihat komentar di dalam setiap file:
- `auth.js` - Penjelasan setiap function
- `profile.js` - Profile page logic
- `login.html` & `registrasi.html` - HTML structure
- `style.css` - CSS untuk auth pages

---

**Dibuat dengan 💙 untuk Nihongo Bizzare**
**Last Updated: March 2, 2026**
