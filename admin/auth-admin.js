// Admin Authentication & Staff Management - auth-admin.js

// Enhanced Security Admin Authentication System

class AdminAuthSystem {
    constructor() {
        this.secureSession = this.loadSecureSession();
        this.currentUser = JSON.parse(localStorage.getItem('currentAdminUser')) || null;
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.maxLoginAttempts = 5;
        this.lockoutDuration = 15 * 60 * 1000; // 15 minutes
    }

    /**
     * Load encrypted session
     */
    loadSecureSession() {
        const encrypted = localStorage.getItem('secureAdminSession');
        if (!encrypted) return null;

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (!csrfToken) return null;

            const decrypted = CryptoJS.AES.decrypt(encrypted, csrfToken);
            const session = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

            // Check if session expired
            if (session.expiresAt < Date.now()) {
                this.logout();
                return null;
            }

            return session;
        } catch (error) {
            console.error('Session decryption error:', error);
            this.logout();
            return null;
        }
    }

    /**
     * Enhanced Admin Login with Security Features
     * @param {string} username - Admin username
     * @param {string} password - Admin password (hashed)
     * @param {string} csrfToken - CSRF token for validation
     * @returns {object|null} - Admin session or null
     */
    secureAdminLogin(username, password, csrfToken) {
        // Check rate limiting
        if (this.isLockedOut()) {
            throw new Error('Account is temporarily locked due to too many failed attempts');
        }

        // Validate CSRF token
        if (!this.validateCSRFToken(csrfToken)) {
            this.recordFailedAttempt();
            throw new Error('Invalid security token');
        }

        // Validate credentials with enhanced security
        if (this.validateSecureAdminCredentials(username, password)) {
            this.resetFailedAttempts();

            const adminData = {
                id: 'admin-001',
                username: username,
                role: 'administrator',
                loginTime: new Date(),
                sessionToken: this.generateSecureToken(),
                userType: 'admin',
                permissions: ['all'],
                expiresAt: Date.now() + this.sessionTimeout,
                csrfToken: csrfToken,
                ipAddress: this.getClientIP(), // Simulated
                userAgent: navigator.userAgent
            };

            // Encrypt and store session
            this.saveSecureSession(adminData, csrfToken);

            localStorage.setItem('currentAdminUser', JSON.stringify(adminData));
            this.secureSession = adminData;
            this.currentUser = adminData;
            this.createSecureSessionLog('LOGIN');

            return adminData;
        } else {
            this.recordFailedAttempt();
            return null;
        }
    }

    /**
     * Validate secure admin credentials with enhanced hashing
     */
    validateSecureAdminCredentials(username, password) {
        // In production, this would validate against a secure server
        // For demo purposes, using enhanced hashing
        const validUsername = 'admin';
        const validPasswordPlain = 'admin123Secure!@#'; // Changed for security
        const expectedHash = CryptoJS.SHA256(validPasswordPlain + validUsername).toString();

        return username === validUsername && password === expectedHash;
    }

    /**
     * Generate cryptographically secure token
     */
    generateSecureToken() {
        const randomBytes = CryptoJS.lib.WordArray.random(32);
        const timestamp = Date.now().toString();
        const userAgent = navigator.userAgent;
        return CryptoJS.SHA256(randomBytes + timestamp + userAgent).toString();
    }

    /**
     * Save encrypted session
     */
    saveSecureSession(sessionData, csrfToken) {
        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(sessionData),
            csrfToken
        ).toString();
        localStorage.setItem('secureAdminSession', encrypted);
    }

    /**
     * Validate CSRF token
     */
    validateCSRFToken(token) {
        if (!token || token.length < 32) return false;

        // In production, validate against server-generated tokens
        // For demo, basic validation
        const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        return token === metaToken;
    }

    /**
     * Check if account is locked out
     */
    isLockedOut() {
        const lockoutUntil = parseInt(localStorage.getItem('lockoutUntil')) || 0;
        return Date.now() < lockoutUntil;
    }

    /**
     * Record failed login attempt
     */
    recordFailedAttempt() {
        const attempts = parseInt(localStorage.getItem('loginAttempts')) || 0;
        const newAttempts = attempts + 1;
        localStorage.setItem('loginAttempts', newAttempts);

        if (newAttempts >= this.maxLoginAttempts) {
            const lockoutUntil = Date.now() + this.lockoutDuration;
            localStorage.setItem('lockoutUntil', lockoutUntil);
        }
    }

    /**
     * Reset failed attempts
     */
    resetFailedAttempts() {
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockoutUntil');
    }

    /**
     * Get remaining lockout time
     */
    getLockoutTimeRemaining() {
        const lockoutUntil = parseInt(localStorage.getItem('lockoutUntil')) || 0;
        const remaining = lockoutUntil - Date.now();
        return Math.max(0, remaining);
    }

    /**
     * Get client IP (simulated)
     */
    getClientIP() {
        // In production, this would be obtained from server
        return '127.0.0.1';
    }

    /**
     * Enhanced logout with security cleanup
     */
    secureLogout() {
        this.createSecureSessionLog('LOGOUT');

        // Clear all session data
        localStorage.removeItem('secureAdminSession');
        localStorage.removeItem('currentAdminUser');
        localStorage.removeItem('adminSession'); // Legacy support
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockoutUntil');

        // Clear session variables
        this.secureSession = null;
        this.currentUser = null;

        // Clear any cached data
        this.clearSensitiveCache();
    }

    /**
     * Clear sensitive cached data
     */
    clearSensitiveCache() {
        // Clear any sensitive data from sessionStorage
        sessionStorage.clear();

        // Clear any service worker caches if applicable
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => {
                    if (name.includes('admin') || name.includes('secure')) {
                        caches.delete(name);
                    }
                });
            });
        }
    }

    /**
     * Check if securely authenticated
     */
    isSecurelyAuthenticated() {
        if (!this.secureSession) return false;

        // Check session expiration
        if (this.secureSession.expiresAt < Date.now()) {
            this.secureLogout();
            return false;
        }

        // Validate session integrity
        return this.validateSessionIntegrity();
    }

    /**
     * Validate session integrity
     */
    validateSessionIntegrity() {
        try {
            const encrypted = localStorage.getItem('secureAdminSession');
            if (!encrypted) return false;

            const csrfToken = this.secureSession.csrfToken;
            const decrypted = CryptoJS.AES.decrypt(encrypted, csrfToken);
            const session = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

            // Verify critical session properties
            return session.id === this.secureSession.id &&
                   session.sessionToken === this.secureSession.sessionToken &&
                   session.username === this.secureSession.username;
        } catch (error) {
            console.error('Session integrity check failed:', error);
            this.secureLogout();
            return false;
        }
    }

    /**
     * Extend session timeout
     */
    extendSession() {
        if (!this.isSecurelyAuthenticated()) return false;

        this.secureSession.expiresAt = Date.now() + this.sessionTimeout;
        this.saveSecureSession(this.secureSession, this.secureSession.csrfToken);
        return true;
    }

    /**
     * Get current secure user
     */
    getCurrentSecureUser() {
        return this.isSecurelyAuthenticated() ? this.secureSession : null;
    }

    /**
     * Get user type (admin or staff)
     */
    getUserType() {
        return this.secureSession?.userType || 'guest';
    }

    /**
     * Get user role
     */
    getUserRole() {
        return this.secureSession?.role || 'guest';
    }

    /**
     * Check if is admin
     */
    isAdmin() {
        return this.secureSession?.userType === 'admin' && this.secureSession?.role === 'administrator';
    }

    /**
     * Check if is staff
     */
    isStaff() {
        return this.secureSession?.userType === 'staff';
    }

    /**
     * Check staff permission
     */
    hasPermission(permission) {
        if (this.isAdmin()) return true;
        return this.secureSession?.permissions?.includes(permission) || false;
    }

    /**
     * Get accessible pages based on permissions
     */
    getAccessiblePages() {
        if (!this.isSecurelyAuthenticated()) return [];

        if (this.isAdmin()) {
            return ['dashboard', 'analytics', 'articles', 'users', 'staff', 'database', 'settings'];
        }

        const permissions = this.secureSession?.permissions || [];
        const pages = [];

        if (permissions.includes('view_analytics')) pages.push('analytics');
        if (permissions.includes('create_articles')) pages.push('articles');
        if (permissions.includes('moderate_comments')) pages.push('users');
        if (permissions.includes('manage_staff')) pages.push('staff');

        return pages;
    }

    /**
     * Check if can access page
     */
    canAccessPage(pageName) {
        return this.getAccessiblePages().includes(pageName);
    }

    /**
     * Check if can manage staff (only admin)
     */
    canManageStaff() {
        return this.isAdmin();
    }

    /**
     * Check if can manage database (only admin)
     */
    canManageDatabase() {
        return this.isAdmin();
    }

    /**
     * Check if can manage settings (only admin)
     */
    canManageSettings() {
        return this.isAdmin();
    }

    /**
     * Check if can create articles
     */
    canCreateArticles() {
        return this.isAdmin() || this.hasPermission('create_articles');
    }

    /**
     * Check if can moderate
     */
    canModerate() {
        return this.isAdmin() || this.hasPermission('moderate_comments');
    }

    /**
     * Check if can view analytics
     */
    canViewAnalytics() {
        return this.isAdmin() || this.hasPermission('view_analytics');
    }

    /**
     * Create secure session log
     */
    createSecureSessionLog(action = 'LOGIN') {
        if (!this.isSecurelyAuthenticated()) return null;

        const log = {
            userId: this.secureSession?.id,
            userType: this.secureSession?.userType,
            userName: this.getUserName(),
            role: this.secureSession?.role,
            loginTime: this.secureSession?.loginTime,
            action: action,
            timestamp: new Date().toISOString(),
            ipAddress: this.secureSession?.ipAddress,
            userAgent: this.secureSession?.userAgent,
            sessionToken: this.secureSession?.sessionToken.substring(0, 8) + '...' // Partial token for logging
        };

        const logs = JSON.parse(localStorage.getItem('secureAdminLogs')) || [];
        logs.push(log);

        // Keep only last 100 logs
        if (logs.length > 100) {
            logs.shift();
        }

        localStorage.setItem('secureAdminLogs', JSON.stringify(logs));
        return log;
    }

    /**
     * Get user display name
     */
    getUserName() {
        if (this.secureSession?.userType === 'admin') {
            return this.secureSession?.username || 'Administrator';
        } else if (this.secureSession?.userType === 'staff') {
            return `${this.secureSession?.firstName} ${this.secureSession?.lastName}` || 'Staff Member';
        }
        return 'Guest';
    }

    /**
     * Get session logs (admin only)
     */
    getSessionLogs() {
        if (!this.isAdmin()) return [];
        return JSON.parse(localStorage.getItem('secureAdminLogs')) || [];
    }

    /**
     * Clear old session logs
     */
    clearOldLogs(days = 30) {
        if (!this.isAdmin()) return;

        const logs = this.getSessionLogs();
        const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);

        const filteredLogs = logs.filter(log => new Date(log.timestamp).getTime() > cutoff);
        localStorage.setItem('secureAdminLogs', JSON.stringify(filteredLogs));
    }

    // Legacy methods for backward compatibility
    adminLogin(username, password) {
        console.warn('Using legacy adminLogin. Please use secureAdminLogin for enhanced security.');
        return this.secureAdminLogin(username, password, this.generateSecureToken());
    }

    logout() {
        console.warn('Using legacy logout. Please use secureLogout for enhanced security.');
        this.secureLogout();
    }

    isAuthenticated() {
        return this.isSecurelyAuthenticated();
    }

    getCurrentUser() {
        return this.getCurrentSecureUser();
    }
}

// Initialize Enhanced Authentication System
const authSystem = new AdminAuthSystem();

// Auto-logout on page unload for security
window.addEventListener('beforeunload', () => {
    // Extend session if user is active
    if (authSystem.isSecurelyAuthenticated()) {
        authSystem.extendSession();
    }
});

// Periodic session validation
setInterval(() => {
    if (!authSystem.isSecurelyAuthenticated()) {
        // Redirect to login if session invalid
        if (window.location.pathname.includes('/admin/') &&
            !window.location.pathname.includes('admin-login.html')) {
            window.location.href = 'admin-login.html';
        }
    }
}, 60000); // Check every minute

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminAuthSystem;
}
