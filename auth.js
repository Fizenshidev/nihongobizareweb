// ============== THEME TOGGLE ============== 
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    // Check saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark', savedTheme === 'dark');
        updateThemeIcon(savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
}

// ============== AUTHENTICATION FUNCTIONS ==============

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Login user (email/password)
function loginUser(email, password) {
    // Validate email format
    if (!isValidEmail(email)) {
        showError('Format email tidak valid');
        return false;
    }

    // Validate password length
    if (password.length < 6) {
        showError('Password minimal 6 karakter');
        return false;
    }

    // Create user object (in real app, this would be from backend)
    const user = {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0],
        picture: null,
        registeredAt: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userProfile', JSON.stringify({
        bio: '',
        theme: 'auto',
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
    }));

    return true;
}

// Register user
function registerUser(fullname, email, password, confirmPassword) {
    // Validation
    if (!fullname.trim()) {
        showError('Nama lengkap harus diisi');
        return false;
    }

    if (!isValidEmail(email)) {
        showError('Format email tidak valid');
        return false;
    }

    if (password.length < 8) {
        showError('Password minimal 8 karakter');
        return false;
    }

    if (password !== confirmPassword) {
        showError('Password tidak cocok');
        return false;
    }

    // Check if email already exists (in real app, check with backend)
    const existingUser = localStorage.getItem('user_' + email);
    if (existingUser) {
        showError('Email sudah terdaftar');
        return false;
    }

    // Create new user
    const user = {
        id: Date.now().toString(),
        email: email,
        name: fullname,
        picture: null,
        registeredAt: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_' + email, JSON.stringify(user)); // Store for checking existing emails
    localStorage.setItem('userProfile', JSON.stringify({
        bio: '',
        theme: 'auto',
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
    }));

    return true;
}

// Logout user
function logoutUser() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is on login page
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (loginUser(email, password)) {
                showSuccess('Login berhasil! Mengalihkan ke halaman utama...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }

    // Check if user is on registration page
    const registrasiForm = document.getElementById('registrasiForm');
    if (registrasiForm) {
        registrasiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            if (!terms) {
                showError('Anda harus menyetujui Syarat & Ketentuan');
                return;
            }
            
            if (registerUser(fullname, email, password, confirmPassword)) {
                showSuccess('Registrasi berhasil! Mengalihkan ke halaman utama...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }

    // Handle logout if logout button exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Apakah Anda yakin ingin logout?')) {
                logoutUser();
            }
        });
    }
});

// Show error message
function showError(message) {
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Show success message
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Redirect to login if not authenticated (for protected pages)
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Update user profile
function updateUserProfile(updates) {
    const user = getCurrentUser();
    if (user) {
        Object.assign(user, updates);
        localStorage.setItem('user', JSON.stringify(user));
    }
}

// Get user profile settings
function getUserProfile() {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
}

// Update user profile settings
function saveUserProfile(profileData) {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
}
