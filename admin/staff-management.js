// Staff Management Module

class StaffManager {
    constructor() {
        this.staffList = JSON.parse(localStorage.getItem('staffList')) || [];
        this.roles = {
            'editor': {
                label: 'Editor',
                permissions: ['create_articles', 'edit_articles', 'publish_articles', 'view_analytics']
            },
            'moderator': {
                label: 'Moderator',
                permissions: ['moderate_comments', 'edit_comments', 'delete_comments', 'ban_user_temp', 'view_analytics']
            },
            'analyst': {
                label: 'Analyst',
                permissions: ['view_analytics', 'export_reports', 'view_traffic', 'view_user_behavior']
            }
        };
    }

    /**
     * Add new staff member
     */
    addStaff(staffData) {
        const newStaff = {
            id: Date.now(),
            firstName: staffData.firstName,
            lastName: staffData.lastName,
            email: staffData.email,
            role: staffData.role,
            department: staffData.department,
            password: this.hashPassword(staffData.password),
            status: staffData.status ? 'active' : 'inactive',
            permissions: staffData.permissions || [],
            joinDate: new Date().toISOString().split('T')[0],
            lastLogin: null,
            createdAt: new Date().toISOString()
        };

        this.staffList.push(newStaff);
        this.saveToLocalStorage();
        return newStaff;
    }

    /**
     * Update staff member
     */
    updateStaff(staffId, staffData) {
        const index = this.staffList.findIndex(s => s.id === staffId);
        if (index !== -1) {
            this.staffList[index] = {
                ...this.staffList[index],
                ...staffData,
                updatedAt: new Date().toISOString()
            };
            this.saveToLocalStorage();
            return this.staffList[index];
        }
        return null;
    }

    /**
     * Delete staff member
     */
    deleteStaff(staffId) {
        this.staffList = this.staffList.filter(s => s.id !== staffId);
        this.saveToLocalStorage();
        return true;
    }

    /**
     * Get all staff
     */
    getAllStaff() {
        return this.staffList;
    }

    /**
     * Get staff by id
     */
    getStaffById(staffId) {
        return this.staffList.find(s => s.id === staffId);
    }

    /**
     * Get staff by email
     */
    getStaffByEmail(email) {
        return this.staffList.find(s => s.email === email);
    }

    /**
     * Filter staff by role
     */
    getStaffByRole(role) {
        return this.staffList.filter(s => s.role === role);
    }

    /**
     * Get active staff
     */
    getActiveStaff() {
        return this.staffList.filter(s => s.status === 'active');
    }

    /**
     * Search staff
     */
    searchStaff(query) {
        const lowerQuery = query.toLowerCase();
        return this.staffList.filter(s =>
            s.firstName.toLowerCase().includes(lowerQuery) ||
            s.lastName.toLowerCase().includes(lowerQuery) ||
            s.email.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Verify staff login
     */
    verifyLogin(email, password) {
        const staff = this.getStaffByEmail(email);
        if (staff && this.comparePassword(password, staff.password)) {
            // Update last login
            staff.lastLogin = new Date().toISOString();
            this.saveToLocalStorage();
            return staff;
        }
        return null;
    }

    /**
     * Check if staff has permission
     */
    hasPermission(staffId, permission) {
        const staff = this.getStaffById(staffId);
        if (!staff) return false;

        const rolePermissions = this.roles[staff.role]?.permissions || [];
        const additionalPermissions = staff.permissions || [];

        return rolePermissions.includes(permission) || additionalPermissions.includes(permission);
    }

    /**
     * Get staff permissions
     */
    getPermissions(staffId) {
        const staff = this.getStaffById(staffId);
        if (!staff) return [];

        const rolePermissions = this.roles[staff.role]?.permissions || [];
        const additionalPermissions = staff.permissions || [];

        return [...new Set([...rolePermissions, ...additionalPermissions])];
    }

    /**
     * Get role info
     */
    getRoleInfo(role) {
        return this.roles[role] || null;
    }

    /**
     * Hash password (simple implementation, use bcrypt on server)
     */
    hashPassword(password) {
        // In production, use bcrypt or similar library
        return btoa(password); // Base64 encoding (NOT SECURE - for demo only)
    }

    /**
     * Compare password
     */
    comparePassword(plain, hashed) {
        return btoa(plain) === hashed;
    }

    /**
     * Save to localStorage
     */
    saveToLocalStorage() {
        localStorage.setItem('staffList', JSON.stringify(this.staffList));
    }

    /**
     * Get stats
     */
    getStats() {
        return {
            total: this.staffList.length,
            active: this.getActiveStaff().length,
            editors: this.getStaffByRole('editor').length,
            moderators: this.getStaffByRole('moderator').length,
            analysts: this.getStaffByRole('analyst').length
        };
    }
}

// Initialize Staff Manager
const staffManager = new StaffManager();

// Setup Event Listeners for Staff Management
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('newStaffBtn')) {
        setupStaffEventListeners();
        loadStaffData();
    }
});

function setupStaffEventListeners() {
    // New Staff Button
    const newStaffBtn = document.getElementById('newStaffBtn');
    if (newStaffBtn) {
        newStaffBtn.addEventListener('click', openStaffModal);
    }

    // Close Staff Modal
    const closeStaffModal = document.getElementById('closeStaffModal');
    if (closeStaffModal) {
        closeStaffModal.addEventListener('click', closeStaffFormModal);
    }

    const cancelStaffBtn = document.getElementById('cancelStaffBtn');
    if (cancelStaffBtn) {
        cancelStaffBtn.addEventListener('click', closeStaffFormModal);
    }

    // Staff Form Submit
    const staffForm = document.getElementById('staffForm');
    if (staffForm) {
        staffForm.addEventListener('submit', handleStaffSubmit);
    }

    // Toggle Password
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', function(e) {
            e.preventDefault();
            const passwordInput = document.getElementById('staffPassword');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // Search and Filter
    const searchStaff = document.getElementById('searchStaff');
    if (searchStaff) {
        searchStaff.addEventListener('keyup', debounce(function(e) {
            const query = e.target.value;
            filterStaffTable(query, document.getElementById('roleFilter').value, document.getElementById('staffStatusFilter').value);
        }, 300));
    }

    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter) {
        roleFilter.addEventListener('change', function() {
            filterStaffTable(document.getElementById('searchStaff').value, this.value, document.getElementById('staffStatusFilter').value);
        });
    }

    const statusFilter = document.getElementById('staffStatusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterStaffTable(document.getElementById('searchStaff').value, document.getElementById('roleFilter').value, this.value);
        });
    }

    // Permission Modal
    const closePermissionModal = document.getElementById('closePermissionModal');
    if (closePermissionModal) {
        closePermissionModal.addEventListener('click', closePermissionFormModal);
    }

    const closePermissionBtn = document.getElementById('closePermissionBtn');
    if (closePermissionBtn) {
        closePermissionBtn.addEventListener('click', closePermissionFormModal);
    }
}

function openStaffModal() {
    document.getElementById('staffForm').reset();
    document.getElementById('staffModalTitle').textContent = 'Tambah Staff Baru';
    document.getElementById('staffModal').classList.add('active');
}

function closeStaffFormModal() {
    document.getElementById('staffModal').classList.remove('active');
}

function closePermissionFormModal() {
    document.getElementById('permissionModal').classList.remove('active');
}

function handleStaffSubmit(e) {
    e.preventDefault();

    const firstName = document.getElementById('staffFirstName').value;
    const lastName = document.getElementById('staffLastName').value;
    const email = document.getElementById('staffEmail').value;
    const role = document.getElementById('staffRole').value;
    const department = document.getElementById('staffDepartment').value;
    const password = document.getElementById('staffPassword').value;
    const isActive = document.getElementById('staffActive').checked;

    // Get additional permissions
    const permissions = [];
    document.querySelectorAll('.perm-checkbox:checked').forEach(checkbox => {
        permissions.push(checkbox.value);
    });

    // Validate
    if (password.length < 8) {
        showNotification('Password harus minimal 8 karakter', 'warning');
        return;
    }

    if (staffManager.getStaffByEmail(email)) {
        showNotification('Email sudah terdaftar', 'error');
        return;
    }

    // Add staff
    staffManager.addStaff({
        firstName,
        lastName,
        email,
        role,
        department,
        password,
        status: isActive,
        permissions
    });

    showNotification('Staff berhasil ditambahkan!', 'success');
    closeStaffFormModal();
    loadStaffData();
}

function loadStaffData() {
    const staff = staffManager.getAllStaff();
    renderStaffTable(staff);
    updateStaffStats();
}

function renderStaffTable(staff) {
    const tbody = document.getElementById('staffTableBody');
    tbody.innerHTML = '';

    if (staff.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 30px; color: #999;">Tidak ada data staff</td></tr>';
        return;
    }

    staff.forEach(s => {
        const row = document.createElement('tr');
        const roleInfo = staffManager.getRoleInfo(s.role);
        
        const lastLogin = s.lastLogin ? new Date(s.lastLogin).toLocaleString('id-ID') : 'Belum pernah';

        row.innerHTML = `
            <td>
                <div class="user-info">
                    <img src="../asset/profile-default.jpg" alt="Staff" class="user-avatar">
                    <span>${s.firstName} ${s.lastName}</span>
                </div>
            </td>
            <td>${s.email}</td>
            <td><span class="badge role-${s.role}">${roleInfo?.label || s.role}</span></td>
            <td>${s.joinDate}</td>
            <td><span class="badge status-${s.status}">${s.status === 'active' ? 'Aktif' : 'Nonaktif'}</span></td>
            <td>${lastLogin}</td>
            <td>
                <button class="btn-permission" title="Lihat Permission" onclick="showPermissions(${s.id})">
                    <i class="fas fa-check-circle"></i>
                </button>
            </td>
            <td class="actions">
                <button class="btn-icon view" title="Lihat" onclick="viewStaff(${s.id})"><i class="fas fa-eye"></i></button>
                <button class="btn-icon edit" title="Edit" onclick="editStaff(${s.id})"><i class="fas fa-edit"></i></button>
                <button class="btn-icon delete" title="Hapus" onclick="deleteStaffMember(${s.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterStaffTable(searchQuery, roleFilter, statusFilter) {
    let filtered = staffManager.getAllStaff();

    if (searchQuery) {
        filtered = staffManager.searchStaff(searchQuery);
    }

    if (roleFilter) {
        filtered = filtered.filter(s => s.role === roleFilter);
    }

    if (statusFilter) {
        filtered = filtered.filter(s => s.status === statusFilter);
    }

    renderStaffTable(filtered);
}

function updateStaffStats() {
    const stats = staffManager.getStats();
    document.getElementById('totalStaff').textContent = stats.total;
    document.getElementById('activeStaff').textContent = stats.active;
    document.getElementById('editorsCount').textContent = stats.editors;
    document.getElementById('moderatorsCount').textContent = stats.moderators;
}

function showPermissions(staffId) {
    const staff = staffManager.getStaffById(staffId);
    if (!staff) return;

    const permissions = staffManager.getPermissions(staffId);
    const roleInfo = staffManager.getRoleInfo(staff.role);

    document.getElementById('permissionStaffName').textContent = `Permissions - ${staff.firstName} ${staff.lastName}`;

    const permissionsList = document.getElementById('permissionsList');
    permissionsList.innerHTML = `
        <div class="permission-item">
            <strong>Role:</strong> ${roleInfo?.label || staff.role}
        </div>
        <div class="permission-item">
            <strong>Permissions:</strong>
            <ul>
                ${permissions.map(p => `<li><i class="fas fa-check"></i> ${formatPermissionName(p)}</li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('permissionModal').classList.add('active');
}

function viewStaff(staffId) {
    const staff = staffManager.getStaffById(staffId);
    if (!staff) return;

    alert(`
Nama: ${staff.firstName} ${staff.lastName}
Email: ${staff.email}
Role: ${staff.role}
Department: ${staff.department}
Status: ${staff.status}
Bergabung: ${staff.joinDate}
    `);
}

function editStaff(staffId) {
    const staff = staffManager.getStaffById(staffId);
    if (!staff) return;

    document.getElementById('staffFirstName').value = staff.firstName;
    document.getElementById('staffLastName').value = staff.lastName;
    document.getElementById('staffEmail').value = staff.email;
    document.getElementById('staffRole').value = staff.role;
    document.getElementById('staffDepartment').value = staff.department;
    document.getElementById('staffActive').checked = staff.status === 'active';

    // Check additional permissions
    document.querySelectorAll('.perm-checkbox').forEach(checkbox => {
        checkbox.checked = staff.permissions.includes(checkbox.value);
    });

    document.getElementById('staffModalTitle').textContent = `Edit Staff - ${staff.firstName}`;
    document.getElementById('staffModal').classList.add('active');

    // Override form submit for edit
    document.getElementById('staffForm').onsubmit = function(e) {
        e.preventDefault();
        const firstName = document.getElementById('staffFirstName').value;
        const lastName = document.getElementById('staffLastName').value;
        const role = document.getElementById('staffRole').value;
        const department = document.getElementById('staffDepartment').value;
        const isActive = document.getElementById('staffActive').checked;

        const permissions = [];
        document.querySelectorAll('.perm-checkbox:checked').forEach(checkbox => {
            permissions.push(checkbox.value);
        });

        staffManager.updateStaff(staffId, {
            firstName,
            lastName,
            role,
            department,
            status: isActive ? 'active' : 'inactive',
            permissions
        });

        showNotification('Staff berhasil diperbarui!', 'success');
        closeStaffFormModal();
        loadStaffData();

        // Reset form submit handler
        document.getElementById('staffForm').onsubmit = handleStaffSubmit;
    };
}

function deleteStaffMember(staffId) {
    if (confirm('Apakah Anda yakin ingin menghapus staff ini?')) {
        staffManager.deleteStaff(staffId);
        showNotification('Staff berhasil dihapus!', 'success');
        loadStaffData();
    }
}

function formatPermissionName(permission) {
    const names = {
        'create_articles': 'Buat Artikel',
        'edit_articles': 'Edit Artikel',
        'delete_articles': 'Hapus Artikel',
        'publish_articles': 'Publikasi Artikel',
        'moderate_comments': 'Moderasi Komentar',
        'edit_comments': 'Edit Komentar',
        'delete_comments': 'Hapus Komentar',
        'ban_user_temp': 'Blokir User (Sementara)',
        'ban_user_permanent': 'Blokir User (Permanen)',
        'view_analytics': 'Lihat Analytics',
        'export_reports': 'Export Reports',
        'view_traffic': 'Lihat Traffic Data',
        'view_user_behavior': 'Lihat User Behavior',
        'can_delete_articles': 'Dapat Menghapus Artikel',
        'can_ban_users': 'Dapat Blokir User Permanen',
        'can_export_data': 'Dapat Export Data',
        'can_view_all_data': 'Dapat Lihat Semua Data'
    };
    return names[permission] || permission;
}

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

// Export for global use
window.showPermissions = showPermissions;
window.viewStaff = viewStaff;
window.editStaff = editStaff;
window.deleteStaffMember = deleteStaffMember;
