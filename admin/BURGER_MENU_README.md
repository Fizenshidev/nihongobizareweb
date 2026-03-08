# Admin Dashboard Navigation & Logout System

## Burger Menu & Navigation

Dashboard Admin sekarang dilengkapi dengan sistem burger menu yang responsif untuk navigasi yang optimal di semua device.

### Fitur Burger Menu

#### 🖥️ **Desktop Behavior**
- **Collapse/Expand**: Klik ikon burger di sidebar header untuk collapse sidebar
- **Persistent State**: Sidebar tetap dalam posisi yang dipilih
- **Smooth Animation**: Transisi yang halus saat toggle

#### 📱 **Mobile Behavior**
- **Overlay Sidebar**: Sidebar muncul sebagai overlay di atas konten
- **Touch Friendly**: Tombol burger di topbar untuk kemudahan akses
- **Body Scroll Lock**: Mencegah scroll body saat sidebar terbuka
- **Overlay Click**: Klik di luar sidebar untuk menutup

### Implementasi

#### HTML Structure
```html
<!-- Desktop burger menu (sidebar header) -->
<span class="sidebar-toggle" id="sidebarToggle">
    <i class="fas fa-bars"></i>
</span>

<!-- Mobile burger menu (topbar) -->
<span class="mobile-sidebar-toggle" id="mobileSidebarToggle">
    <i class="fas fa-bars"></i>
</span>
```

#### CSS Classes
```css
.sidebar-toggle          /* Desktop toggle button */
.mobile-sidebar-toggle   /* Mobile toggle button */
.sidebar.active          /* Mobile: sidebar overlay active */
.sidebar.collapsed       /* Desktop: sidebar collapsed */
```

#### JavaScript Functions
```javascript
toggleSidebar()          // Main toggle function
closeMobileSidebar()     // Close mobile sidebar
```

### Responsive Breakpoints

- **Desktop**: > 768px - Collapse behavior
- **Mobile**: ≤ 768px - Overlay behavior

## Logout System

### Fitur Logout

#### 🔐 **Secure Logout**
- **Session Cleanup**: Menghapus semua session data
- **LocalStorage Clear**: Membersihkan adminSession, secureAdminSession, currentAdminUser
- **Redirect**: Otomatis redirect ke `admin-login.html`

#### 🛡️ **Security Features**
- **Confirmation Dialog**: Konfirmasi sebelum logout
- **Complete Cleanup**: Menghapus semua data sensitif
- **Secure Redirect**: Mengarah ke halaman login admin

### Implementasi Logout

#### HTML
```html
<a href="#" id="adminLogout" class="logout-btn">
    <i class="fas fa-sign-out-alt"></i> Logout
</a>
```

#### JavaScript
```javascript
function handleAdminLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        // Clear all session data
        localStorage.removeItem('adminSession');
        localStorage.removeItem('secureAdminSession');
        localStorage.removeItem('currentAdminUser');
        // Redirect to admin login
        window.location.href = 'admin-login.html';
    }
}
```

## File yang Diupdate

### Burger Menu
- ✅ `admin/index.html` - Dashboard utama
- ✅ `admin/analytics.html` - Halaman analytics
- ✅ `admin/articles.html` - Manajemen artikel
- ✅ `admin/users.html` - User management
- ✅ `admin/staff.html` - Manajemen staff
- ✅ `admin/database.html` - Database management
- ✅ `admin/settings.html` - Pengaturan

### Logout Functionality
- ✅ `admin/admin.js` - Updated logout function
- ✅ All admin pages - Mengarah ke `admin-login.html`

## Testing

### Test Burger Menu
Buka `admin/test-burger-menu.html` untuk testing comprehensive:
- Status menu (Open/Closed/Collapsed)
- Screen size detection
- Logout functionality test

### Manual Testing
1. **Desktop**: Resize browser > 768px, klik burger di sidebar
2. **Mobile**: Resize browser ≤ 768px, klik burger di topbar
3. **Logout**: Klik logout, pastikan redirect ke admin-login.html

## Customization

### Mengubah Breakpoint
```css
@media (max-width: 768px) {
    /* Mobile styles */
}
```

### Mengubah Animation
```css
.sidebar {
    transition: transform 0.3s ease;
}
```

### Menambah Menu Items
```html
<li><a href="new-page.html" class="nav-item">
    <i class="fas fa-new-icon"></i> New Page
</a></li>
```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lightweight**: CSS-only animations
- **Efficient**: Event delegation untuk mobile overlay
- **Optimized**: Conditional logic berdasarkan screen size

---

**Burger menu & logout system siap digunakan! 🚀**