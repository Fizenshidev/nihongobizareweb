// Admin Panel JavaScript

// Global Admin State
const adminState = {
    currentUser: 'Administrator',
    isAuthenticated: true,
    theme: localStorage.getItem('adminTheme') || 'light'
};

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
    setupEventListeners();
    loadDashboardData();
});

// Initialize Admin Panel
function initializeAdminPanel() {
    setAdminUser();
    setupTheme();
    highlightCurrentPage();
}

// Set Admin User
function setAdminUser() {
    const adminNameElements = document.querySelectorAll('#adminName');
    adminNameElements.forEach(el => {
        el.textContent = adminState.currentUser;
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Sidebar toggle (desktop)
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Mobile sidebar toggle
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close mobile sidebar when clicking overlay
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // Create overlay click handler
        const overlayHandler = (e) => {
            if (e.target === sidebar && window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                closeMobileSidebar();
            }
        };
        sidebar.addEventListener('click', overlayHandler);
    }

    // Articles modal
    const newArticleBtn = document.getElementById('newArticleBtn');
    if (newArticleBtn) {
        newArticleBtn.addEventListener('click', openArticleModal);
    }

    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', closeArticleModal);
    }

    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeArticleModal);
    }

    const articleForm = document.getElementById('articleForm');
    if (articleForm) {
        articleForm.addEventListener('submit', handleArticleSubmit);
    }

    // Logout
    const logoutButtons = document.querySelectorAll('#adminLogout');
    logoutButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            handleAdminLogout();
        });
    });

    // Settings tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', handleTabClick);
    });

    // Filter and search
    const searchInputs = document.querySelectorAll('#searchArticles, #searchUsers');
    searchInputs.forEach(input => {
        input.addEventListener('keyup', debounce(handleSearch, 300));
    });

    const filterSelects = document.querySelectorAll('#categoryFilter, #statusFilter, #periodFilter');
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilterChange);
    });

    // Database operations
    const backupBtn = document.getElementById('backupBtn');
    if (backupBtn) {
        backupBtn.addEventListener('click', handleBackup);
    }

    const restoreBtn = document.getElementById('restoreBtn');
    if (restoreBtn) {
        restoreBtn.addEventListener('click', handleRestore);
    }

    const optimizeBtn = document.getElementById('optimizeBtn');
    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', handleOptimize);
    }

    const repairBtn = document.getElementById('repairBtn');
    if (repairBtn) {
        repairBtn.addEventListener('click', handleRepair);
    }

    // Forms
    const generalForm = document.getElementById('generalForm');
    if (generalForm) {
        generalForm.addEventListener('submit', handleFormSubmit);
    }

    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', handleFormSubmit);
    }

    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', handleFormSubmit);
    }

    const advancedForm = document.getElementById('advancedForm');
    if (advancedForm) {
        advancedForm.addEventListener('submit', handleFormSubmit);
    }

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExport);
    }
}

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    const mainContent = document.querySelector('.main-content');
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Mobile behavior: overlay sidebar
        sidebar.classList.toggle('active');
        if (sidebarToggle) sidebarToggle.classList.toggle('active');
        if (mobileSidebarToggle) mobileSidebarToggle.classList.toggle('active');

        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Close sidebar when clicking overlay
        const overlay = sidebar.querySelector('::before');
        if (overlay) {
            overlay.addEventListener('click', closeMobileSidebar);
        }
    } else {
        // Desktop behavior: collapse sidebar
        sidebar.classList.toggle('collapsed');
        if (sidebarToggle) sidebarToggle.classList.toggle('active');

        // Adjust main content margin
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '80px';
        } else {
            mainContent.style.marginLeft = '280px';
        }
    }
}

// Close mobile sidebar
function closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');

    sidebar.classList.remove('active');
    if (sidebarToggle) sidebarToggle.classList.remove('active');
    if (mobileSidebarToggle) mobileSidebarToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Highlight Current Page
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Article Modal Functions
function openArticleModal() {
    const modal = document.getElementById('articleModal');
    modal.classList.add('active');
}

function closeArticleModal() {
    const modal = document.getElementById('articleModal');
    modal.classList.remove('active');
}

function handleArticleSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('articleTitle').value;
    const category = document.getElementById('articleCategory').value;
    const author = document.getElementById('articleAuthor').value;
    const content = document.getElementById('articleContent').value;
    
    // Here you would typically send this to a server
    console.log({
        title,
        category,
        author,
        content
    });
    
    showNotification('Artikel berhasil disimpan!', 'success');
    closeArticleModal();
    document.getElementById('articleForm').reset();
}

// Logout Function
function handleAdminLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        // Clear session
        localStorage.removeItem('adminSession');
        localStorage.removeItem('secureAdminSession');
        localStorage.removeItem('currentAdminUser');
        // Redirect to admin login page
        window.location.href = 'admin-login.html';
    }
}

// Load Dashboard Data
function loadDashboardData() {
    // Simulate loading data
    const data = {
        totalVisitors: 2543,
        totalUsers: 234,
        totalArticles: 12,
        todayActivity: 156
    };

    document.getElementById('totalVisitors') && 
        (document.getElementById('totalVisitors').textContent = data.totalVisitors);
    document.getElementById('totalUsers') && 
        (document.getElementById('totalUsers').textContent = data.totalUsers);
    document.getElementById('totalArticles') && 
        (document.getElementById('totalArticles').textContent = data.totalArticles);
    document.getElementById('todayActivity') && 
        (document.getElementById('todayActivity').textContent = data.todayActivity);

    // Initialize Charts
    initializeCharts();
}

// Initialize Charts
function initializeCharts() {
    // Visitors Chart
    const visitorsCtx = document.getElementById('visitorsChart');
    if (visitorsCtx) {
        new Chart(visitorsCtx, {
            type: 'line',
            data: {
                labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
                datasets: [{
                    label: 'Pengunjung',
                    data: [320, 350, 310, 400, 370, 450, 410],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#667eea'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Traffic Source Chart
    const trafficCtx = document.getElementById('trafficSourceChart');
    if (trafficCtx) {
        new Chart(trafficCtx, {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Organic', 'Referral', 'Social'],
                datasets: [{
                    data: [45, 30, 15, 10],
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#48c774',
                        '#ffdd57'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Daily Traffic Chart
    const dailyTrafficCtx = document.getElementById('dailyTrafficChart');
    if (dailyTrafficCtx) {
        new Chart(dailyTrafficCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Traffic',
                    data: [320, 350, 310, 400, 370, 450, 410],
                    backgroundColor: '#667eea',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Device Chart
    const deviceCtx = document.getElementById('deviceChart');
    if (deviceCtx) {
        new Chart(deviceCtx, {
            type: 'pie',
            data: {
                labels: ['Desktop', 'Mobile', 'Tablet'],
                datasets: [{
                    data: [55, 35, 10],
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#48c774'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Browser Chart
    const browserCtx = document.getElementById('browserChart');
    if (browserCtx) {
        new Chart(browserCtx, {
            type: 'bar',
            data: {
                labels: ['Chrome', 'Firefox', 'Safari', 'Edge'],
                datasets: [{
                    label: 'Users',
                    data: [400, 250, 150, 100],
                    backgroundColor: ['#667eea', '#764ba2', '#48c774', '#ffdd57'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Location Chart
    const locationCtx = document.getElementById('locationChart');
    if (locationCtx) {
        new Chart(locationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Indonesia', 'Japan', 'USA', 'Others'],
                datasets: [{
                    data: [65, 20, 10, 5],
                    backgroundColor: [
                        '#667eea',
                        '#764ba2',
                        '#48c774',
                        '#ffdd57'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Handle Tab Click
function handleTabClick(e) {
    const tabName = e.target.closest('.tab-btn').getAttribute('data-tab');
    
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName + '-tab').classList.add('active');
    e.target.closest('.tab-btn').classList.add('active');
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();
    showNotification('Pengaturan berhasil disimpan!', 'success');
}

// Handle Search
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    console.log('Searching for:', query);
    // Implement search logic here
}

// Handle Filter Change
function handleFilterChange(e) {
    const value = e.target.value;
    console.log('Filter changed to:', value);
    // Implement filter logic here
}

// Database Operations
function handleBackup() {
    showNotification('Backup dimulai...', 'info');
    setTimeout(() => {
        showNotification('Backup berhasil dibuat!', 'success');
    }, 2000);
}

function handleRestore() {
    showNotification('Pilih file backup untuk direstore', 'info');
}

function handleOptimize() {
    showNotification('Optimasi database dimulai...', 'info');
    setTimeout(() => {
        showNotification('Database berhasil dioptimasi!', 'success');
    }, 2000);
}

function handleRepair() {
    showNotification('Perbaikan database dimulai...', 'info');
    setTimeout(() => {
        showNotification('Database berhasil diperbaiki!', 'success');
    }, 2000);
}

// Handle Export
function handleExport() {
    showNotification('Laporan sedang disiapkan...', 'info');
    setTimeout(() => {
        showNotification('Laporan berhasil diunduh!', 'success');
    }, 1500);
}

// Setup Theme
function setupTheme() {
    if (adminState.theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        'success': '#48c774',
        'error': '#f14668',
        'warning': '#ffdd57',
        'info': '#667eea'
    };
    return colors[type] || colors['info'];
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('articleModal');
    if (modal && e.target === modal) {
        closeArticleModal();
    }
});
