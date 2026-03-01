// ============== PROFILE PAGE FUNCTIONS ==============

document.addEventListener('DOMContentLoaded', function() {
    // Require login for profile page
    if (!requireLogin()) {
        return;
    }

    // Load user profile data
    loadUserProfile();
    
    // Setup tab switching
    setupTabSwitching();
    
    // Setup form submission
    setupSettingsForm();
    
    // Setup delete account button
    setupDeleteAccount();
});

// Load user profile data to display
function loadUserProfile() {
    const user = getCurrentUser();
    const profile = getUserProfile();
    
    if (user) {
        // Update profile header
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        
        // Update profile picture if available
        if (user.picture) {
            document.getElementById('profilePicture').src = user.picture;
        }
        
        // Update member since date
        if (user.registeredAt) {
            const registerDate = new Date(user.registeredAt);
            const month = registerDate.toLocaleString('id-ID', { month: 'long' });
            const year = registerDate.getFullYear();
            document.getElementById('memberSince').textContent = `Member sejak ${month} ${year}`;
        }
    }
    
    // Load profile settings
    if (profile) {
        // Update stats
        document.getElementById('articlesRead').textContent = profile.articlesRead;
        document.getElementById('practicesCompleted').textContent = profile.practicesCompleted;
        document.getElementById('streakDays').textContent = profile.streakDays;
        document.getElementById('totalLearningTime').textContent = formatTime(profile.totalLearningTime);
        
        // Update progress bars
        updateProgressBars(profile.progress);
        
        // Load settings form
        if (document.getElementById('fullname-edit')) {
            document.getElementById('fullname-edit').value = user.name;
            document.getElementById('email-edit').value = user.email;
            document.getElementById('bio').value = profile.bio || '';
            document.getElementById('themePreference').value = profile.theme || 'auto';
            document.getElementById('emailNotifications').checked = profile.emailNotifications;
        }
    }
}

// Update progress bars
function updateProgressBars(progress) {
    const categories = ['hiragana', 'katakana', 'vocabulary', 'particles'];
    
    categories.forEach(category => {
        const percentage = progress[category] || 0;
        const progressText = document.getElementById(category + 'Progress');
        const progressFill = document.getElementById(category + 'Fill');
        
        if (progressText) progressText.textContent = percentage + '%';
        if (progressFill) progressFill.style.width = percentage + '%';
    });
}

// Format time (hours)
function formatTime(hours) {
    if (hours < 1) {
        return Math.round(hours * 60) + 'm';
    }
    return Math.round(hours * 10) / 10 + 'h';
}

// Setup tab switching
function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// Setup settings form submission
function setupSettingsForm() {
    const settingsForm = document.getElementById('settingsForm');
    
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const user = getCurrentUser();
            const profile = getUserProfile();
            
            // Update user name
            const newFullname = document.getElementById('fullname-edit').value;
            if (newFullname.trim()) {
                user.name = newFullname;
                updateUserProfile({ name: newFullname });
                document.getElementById('userName').textContent = newFullname;
            }
            
            // Update profile settings
            profile.bio = document.getElementById('bio').value;
            profile.theme = document.getElementById('themePreference').value;
            profile.emailNotifications = document.getElementById('emailNotifications').checked;
            
            saveUserProfile(profile);
            
            // Apply theme preference
            applyThemePreference(profile.theme);
            
            showSuccess('Pengaturan berhasil disimpan!');
        });
    }
}

// Apply theme preference
function applyThemePreference(theme) {
    const body = document.body;
    
    if (theme === 'dark') {
        body.classList.add('dark');
    } else if (theme === 'light') {
        body.classList.remove('dark');
    } else if (theme === 'auto') {
        // Auto theme based on system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }
}

// Setup delete account button
function setupDeleteAccount() {
    const deleteBtn = document.getElementById('deleteAccountBtn');
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            if (confirm('⚠️ Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.')) {
                if (confirm('Konfirmasi lagi: Hapus akun secara permanen?')) {
                    // Delete user data
                    const user = getCurrentUser();
                    if (user) {
                        localStorage.removeItem('user');
                        localStorage.removeItem('userProfile');
                        localStorage.removeItem('user_' + user.email);
                    }
                    
                    showSuccess('Akun berhasil dihapus. Mengarahkan ke halaman login...');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }
            }
        });
    }
}
