# 📚 Panduan Lengkap Setup Dashboard Admin & Database

Dokumentasi komprehensif untuk mengintegrasikan Dashboard Admin dan Database ke website Nihongo Bizzare.

## 📋 Daftar Isi

1. [Prerequisites](#prerequisites)
2. [Struktur Folder](#struktur-folder)
3. [Instalasi & Setup](#instalasi--setup)
4. [Konfigurasi Database](#konfigurasi-database)
5. [Konfigurasi Admin Panel](#konfigurasi-admin-panel)
6. [Security Setup](#security-setup)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)
10. [FAQ](#faq)

---

## Prerequisites

### Software yang Diperlukan

- **Web Server**: Apache, Nginx, atau PHP Built-in Server
- **PHP**: Version 7.4+ (untuk backend operations)
- **MySQL/MariaDB**: Version 5.7+ (jika menggunakan database)
- **Browser Modern**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Git**: Untuk version control (opsional)
- **Node.js**: Opsional, untuk build tools

### Persyaratan Server

```
✓ JavaScript (ES6+) support
✓ CSS3 support
✓ localStorage/sessionStorage support
✓ HTTPS (untuk production)
✓ CORS enabled (jika API standalone)
✓ File upload permissions
✓ Cron jobs (untuk automated backups)
```

### System Requirements

**Minimum:**
- RAM: 512 MB
- Storage: 1 GB
- CPU: 1 Core

**Recommended (Production):**
- RAM: 2+ GB
- Storage: 20+ GB
- CPU: 2+ Cores
- SSD: Untuk database

---

## Struktur Folder

### Admin Panel Complete Structure

```
nihongobizzare-web/
├── admin/
│   ├── index.html                    # 🎯 Main dashboard page
│   ├── admin-login.html              # 🔐 Login dengan security tinggi
│   ├── analytics.html                # 📊 Analytics Pengunjung
│   ├── articles.html                 # 📝 Manajemen Artikel
│   ├── users.html                    # 👥 User Management
│   ├── staff.html                    # 👔 Manajemen Staff
│   ├── database.html                 # 💾 Database Management
│   ├── settings.html                 # ⚙️ Pengaturan Admin
│   │
│   ├── api/
│   │   └── admin-api.php             # Backend API endpoints
│   │
│   ├── js/
│   │   ├── admin.js                  # Main admin JavaScript
│   │   ├── auth-admin.js             # 🔒 Authentication system
│   │   └── staff-management.js       # Staff management logic
│   │
│   ├── css/
│   │   └── admin.css                 # Admin panel styles
│   │
│   ├── data/
│   │   ├── sample-data.json          # Sample data untuk testing
│   │   └── DATABASE_SCHEMA.sql       # Database schema SQL
│   │
│   ├── assets/                       # Admin assets (icons, avatars)
│   │
│   ├── tests/
│   │   ├── test-security.html        # Security testing page
│   │   └── test-burger-menu.html     # Menu testing page
│   │
│   ├── ADMIN_SECURITY_README.md      # 🔐 Security documentation
│   ├── BURGER_MENU_README.md         # 🍔 Navigation documentation
│   ├── QUICK_START.md                # ⚡ Quick start guide
│   ├── STAFF_MANAGEMENT.md           # Staff management guide
│   ├── .htaccess                     # Apache configuration
│   ├── .env.local                    # Environment variables (local)
│   └── README.md                     # Admin panel README
│
├── article/                          # Article pages
│   ├── culture.html
│   ├── grammar.html
│   ├── hiragana.html
│   ├── katakana.html
│   ├── particles.html
│   └── vocabulary.html
│
├── asset/                            # Global assets
│   ├── profile-default.jpg
│   └── [other images]
│
├── public/                           # Public files (uploads)
│   ├── uploads/
│   │   ├── articles/
│   │   ├── avatars/
│   │   └── documents/
│   └── .htaccess                     # Protect public folder
│
├── config/                           # Configuration files
│   ├── database.php                  # Database config
│   ├── security.php                  # Security settings
│   └── constants.php                 # Application constants
│
├── backups/                          # Database backups
│   └── .htaccess                     # Protect backups folder
│
├── index.html                        # Main website
├── login.html                        # User login
├── profile.html                      # User profile
├── script.js                         # Main website scripts
├── style.css                         # Main website styles
│
├── .env.production                   # Production environment
├── .htaccess                         # Root Apache config
├── robots.txt                        # SEO robots file
├── sitemap.xml                       # Sitemap untuk SEO
├── INSTALLATION_GUIDE.md             # 📖 This file
└── README.md                         # Main project README
```

### Database Structure

```
Database: nihongo_bizzare

Tables:
├── admins                     # Admin users
├── admin_sessions             # Admin sessions (temporary)
├── staff                      # Staff members
├── staff_sessions             # Staff sessions
├── users                      # Regular users
├── articles                   # Content articles
├── audit_logs                 # Security audit trail
└── site_settings              # Global settings
```

---

## Instalasi & Setup

### Step 1: Download/Clone Project

```bash
# Option A: Clone dari Git
git clone https://github.com/your-repo/nihongobizzare-web.git
cd nihongobizzare-web

# Option B: Download ZIP
# 1. Download dari GitHub
# 2. Extract ke folder
# 3. Open terminal di folder
```

### Step 2: Setup Local Web Server

#### Method A: PHP Built-in Server (⭐ Recommended untuk Development)

**Keuntungan:**
- Tidak perlu install Apache/Nginx
- Cepat setup
- Perfect untuk development

**Setup:**

```bash
# Navigate ke project
cd "D:\Project\nihongobizzare-web"

# Start server
php -S localhost:8000

# Alternative ports
php -S localhost:8080
php -S localhost:3000

# Make accessible from other machines
php -S 0.0.0.0:8000
```

**Akses:**
- Admin: `http://localhost:8000/admin/admin-login.html`
- Dashboard: `http://localhost:8000/admin/index.html`
- Main: `http://localhost:8000/index.html`

#### Method B: Node.js HTTP Server

```bash
# Install globally (one time)
npm install -g http-server

# Start server
http-server . -p 8000

# Dengan live reload
npx http-server --gzip
```

#### Method C: Python HTTP Server

```bash
# Python 3 (recommended)
python -m http.server 8000

# Python 2 (old, not recommended)
python -m SimpleHTTPServer 8000
```

#### Method D: Apache Virtual Host

**File**: `C:\xampp\apache\conf\extra\httpd-vhosts.conf` (Windows)  
**File**: `/etc/apache2/sites-available/nihongobizzare.conf` (Linux)

```apache
<VirtualHost *:80>
    ServerName nihongobizzare.local
    ServerAlias *.nihongobizzare.local
    DocumentRoot "D:\Project\nihongobizzare-web"
    
    <Directory "D:\Project\nihongobizzare-web">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
    </IfModule>
    
    ErrorLog "logs/nihongobizzare_error.log"
    CustomLog "logs/nihongobizzare_access.log" combined
</VirtualHost>

# If using HTTPS
<VirtualHost *:443>
    ServerName nihongobizzare.local
    DocumentRoot "D:\Project\nihongobizzare-web"
    
    SSLEngine on
    SSLCertificateFile "path/to/cert.pem"
    SSLCertificateKeyFile "path/to/key.pem"
    
    # ... rest of config
</VirtualHost>
```

**For Linux:**
```bash
# Enable site
sudo a2ensite nihongobizzare.conf

# Reload Apache
sudo systemctl reload apache2

# Edit hosts file
sudo nano /etc/hosts
# Add: 127.0.0.1 nihongobizzare.local
```

**For Windows (XAMPP):**
```
1. Edit C:\Windows\System32\drivers\etc\hosts
2. Add: 127.0.0.1 nihongobizzare.local
3. Edit C:\xampp\apache\conf\extra\httpd-vhosts.conf (like above)
4. Restart Apache di XAMPP Control Panel
```

### Step 3: Verifikasi Setup

```bash
# Check folder structure
dir admin\              # Windows
ls -la admin/           # Linux/Mac

# Check key files exist
File admin\index.html                exists? ✓
File admin\admin-login.html          exists? ✓
File admin\js\admin.js               exists? ✓
File admin\css\admin.css             exists? ✓
```

### Step 4: Buka Dashboard

**Admin Login Page:**
```
http://localhost:8000/admin/admin-login.html
```

**Dashboard:**
```
http://localhost:8000/admin/index.html
```

**Main Website:**
```
http://localhost:8000/index.html
```

---

## Konfigurasi Database

### Option 1: Client-Side Storage (Current - Development)

Sistem saat ini menggunakan **localStorage** untuk client-side caching.

**Lokasi Data:**
- Browser localStorage
- SessionStorage (temporary)

**Folders:**
```
admin/data/
├── sample-data.json      # Sample data
└── DATABASE_SCHEMA.md    # Schema documentation
```

**Usage:**
```javascript
// Save to localStorage
const data = { username: 'admin', role: 'administrator' };
localStorage.setItem('currentAdminUser', JSON.stringify(data));

// Retrieve from localStorage
const user = JSON.parse(localStorage.getItem('currentAdminUser'));

// Clear data
localStorage.removeItem('currentAdminUser');
```

**Limitations:**
- ❌ Data tidak persisten antar browser
- ❌ Limited storage (5-10MB)
- ❌ Tidak aman untuk production
- ✅ Baik untuk development & testing

---

### Option 2: MySQL Database (Recommended - Production)

#### 2.1: Install MySQL/MariaDB

**Windows (XAMPP):**
1. Download XAMPP dari apachefriends.org
2. Install XAMPP
3. Start MySQL dari XAMPP Control Panel
4. Access di `http://localhost/phpmyadmin`

**Linux:**
```bash
sudo apt-get install mysql-server
mysql_secure_installation
sudo systemctl start mysql
```

**macOS:**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

#### 2.2: Create Database

```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE nihongo_bizzare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Use database
USE nihongo_bizzare;

# Verify
SHOW DATABASES;
```

#### 2.3: Import Database Schema

**File**: `admin/data/DATABASE_SCHEMA.sql`

```sql
-- Admin Users Table
CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'administrator',
    status VARCHAR(20) DEFAULT 'active',
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin Sessions Table
CREATE TABLE IF NOT EXISTS admin_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
    INDEX idx_admin_id (admin_id),
    INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Staff Table
CREATE TABLE IF NOT EXISTS staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    department VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active',
    permissions JSON,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users Table (Regular site users)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    author_id INT,
    content LONGTEXT,
    excerpt VARCHAR(500),
    featured_image VARCHAR(255),
    status VARCHAR(20) DEFAULT 'draft',
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at DATETIME NULL,
    
    FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL,
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT,
    action VARCHAR(100),
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE SET NULL,
    INDEX idx_admin_id (admin_id),
    INDEX idx_action (action),
    INDEX idx_timestamp (timestamp)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value LONGTEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin
INSERT INTO admins (username, email, password_hash, first_name, last_name, role, status)
VALUES ('admin', 'admin@nihongobizzare.com', '$2y$10$', 'Admin', 'Nihongo', 'administrator', 'active');

-- Insert default settings
INSERT INTO site_settings (setting_key, setting_value, description)
VALUES 
    ('site_name', 'Nihongo Bizzare', 'Website name'),
    ('admin_email', 'admin@nihongobizzare.com', 'Admin email address'),
    ('maintenance_mode', 'false', 'Is site in maintenance'),
    ('max_upload_size', '10485760', 'Max upload size in bytes');
```

**Import Method 1: MySQL CLI**
```bash
mysql -u root -p nihongo_bizzare < admin/data/DATABASE_SCHEMA.sql
```

**Import Method 2: phpMyAdmin**
1. Login ke `http://localhost/phpmyadmin`
2. Select database `nihongo_bizzare`
3. Klik "Import"
4. Upload `DATABASE_SCHEMA.sql`
5. Klik "Go"

**Import Method 3: PHP Script**

**File**: `admin/setup/import-database.php`

```php
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nihongo_bizzare";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sqlFile = file_get_contents(__DIR__ . '/../data/DATABASE_SCHEMA.sql');
$queries = array_filter(array_map('trim', explode(';', $sqlFile)));

foreach ($queries as $query) {
    if (!empty($query)) {
        if ($conn->query($query) !== TRUE) {
            echo "Error: " . $conn->error . "\n";
        }
    }
}

echo "Database imported successfully!";
$conn->close();
?>
```

Access: `http://localhost:8000/admin/setup/import-database.php`

#### 2.4: Create Database Configuration File

**File**: `admin/config/database.php`

```php
<?php
// Database Configuration

// Development
if ($_ENV['APP_ENV'] === 'development') {
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'nihongo_bizzare');
}

// Production
else if ($_ENV['APP_ENV'] === 'production') {
    define('DB_HOST', $_ENV['DB_HOST']);
    define('DB_USER', $_ENV['DB_USER']);
    define('DB_PASS', $_ENV['DB_PASS']);
    define('DB_NAME', $_ENV['DB_NAME']);
}

define('DB_PORT', 3306);
define('DB_CHARSET', 'utf8mb4');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(['error' => 'Database connection failed']));
}

$conn->set_charset(DB_CHARSET);

return $conn;
?>
```

#### 2.5: Create API Backend

**File**: `admin/api/admin-api.php`

```php
<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Load database config
require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get action
$action = $_GET['action'] ?? $_POST['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch($action) {
        // Authentication
        case 'login':
            handleLogin($conn);
            break;
        
        case 'verifySession':
            verifySession($conn);
            break;
        
        case 'logout':
            handleLogout($conn);
            break;
        
        // Users
        case 'getUsers':
            getUsers($conn);
            break;
        
        case 'getUserById':
            getUserById($conn);
            break;
        
        case 'updateUser':
            updateUser($conn);
            break;
        
        // Staff
        case 'getStaff':
            getStaff($conn);
            break;
        
        case 'addStaff':
            addStaff($conn);
            break;
        
        // Analytics
        case 'getAnalytics':
            getAnalytics($conn);
            break;
        
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

// Handler Functions
function handleLogin($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $conn->real_escape_string($data['username'] ?? '');
    $password = $data['password'] ?? '';
    
    $query = "SELECT * FROM admins WHERE username = '$username' AND status = 'active' LIMIT 1";
    $result = $conn->query($query);
    
    if ($result && $result->num_rows > 0) {
        $admin = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $admin['password_hash'])) {
            // Create session
            $sessionToken = bin2hex(random_bytes(32));
            $expiresAt = date('Y-m-d H:i:s', strtotime('+30 minutes'));
            $ipAddress = $_SERVER['REMOTE_ADDR'];
            $userAgent = $_SERVER['HTTP_USER_AGENT'];
            
            $insertSession = "INSERT INTO admin_sessions 
                            (admin_id, session_token, ip_address, user_agent, expires_at) 
                            VALUES ('{$admin['id']}', '$sessionToken', '$ipAddress', '$userAgent', '$expiresAt')";
            
            if ($conn->query($insertSession)) {
                // Log action
                logAction($conn, $admin['id'], 'LOGIN', "Admin logged in from $ipAddress");
                
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'sessionToken' => $sessionToken,
                    'admin' => [
                        'id' => $admin['id'],
                        'username' => $admin['username'],
                        'email' => $admin['email'],
                        'role' => $admin['role'],
                        'first_name' => $admin['first_name'],
                        'last_name' => $admin['last_name']
                    ]
                ]);
            } else {
                throw new Exception('Failed to create session');
            }
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
        }
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'User not found']);
    }
}

function verifySession($conn) {
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = str_replace('Bearer ', '', $token);
    
    if (empty($token)) {
        http_response_code(401);
        echo json_encode(['error' => 'No token provided']);
        return;
    }
    
    $token = $conn->real_escape_string($token);
    $query = "SELECT a.*, s.expires_at FROM admin_sessions s 
              JOIN admins a ON s.admin_id = a.id 
              WHERE s.session_token = '$token' AND s.expires_at > NOW() LIMIT 1";
    
    $result = $conn->query($query);
    
    if ($result && $result->num_rows > 0) {
        $admin = $result->fetch_assoc();
        echo json_encode([
            'valid' => true,
            'admin' => [
                'id' => $admin['id'],
                'username' => $admin['username'],
                'role' => $admin['role']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid or expired token']);
    }
}

function getUsers($conn) {
    // Verify session first
    if (!verifyAdminSession($conn)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    $query = "SELECT id, username, email, first_name, last_name, status, created_at 
              FROM users ORDER BY created_at DESC LIMIT 1000";
    $result = $conn->query($query);
    
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    echo json_encode($users);
}

function getAnalytics($conn) {
    if (!verifyAdminSession($conn)) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    }
    
    // Get total users
    $users = $conn->query("SELECT COUNT(*) as total FROM users")->fetch_assoc();
    
    // Get total articles
    $articles = $conn->query("SELECT COUNT(*) as total FROM articles")->fetch_assoc();
    
    // Get recent logins
    $logins = $conn->query("SELECT COUNT(*) as total FROM audit_logs WHERE action = 'LOGIN' AND timestamp > DATE_SUB(NOW(), INTERVAL 7 DAY)")->fetch_assoc();
    
    echo json_encode([
        'users' => $users['total'],
        'articles' => $articles['total'],
        'recentLogins' => $logins['total'],
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

function logAction($conn, $adminId, $action, $description) {
    $adminId = intval($adminId);
    $action = $conn->real_escape_string($action);
    $description = $conn->real_escape_string($description);
    $ipAddress = $_SERVER['REMOTE_ADDR'];
    $userAgent = $conn->real_escape_string($_SERVER['HTTP_USER_AGENT']);
    
    $query = "INSERT INTO audit_logs (admin_id, action, description, ip_address, user_agent) 
              VALUES ($adminId, '$action', '$description', '$ipAddress', '$userAgent')";
    
    return $conn->query($query);
}

function verifyAdminSession($conn) {
    $token = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = str_replace('Bearer ', '', $token);
    
    if (empty($token)) return false;
    
    $token = $conn->real_escape_string($token);
    $query = "SELECT id FROM admin_sessions WHERE session_token = '$token' AND expires_at > NOW()";
    $result = $conn->query($query);
    
    return $result && $result->num_rows > 0;
}

$conn->close();
?>
```

---

## Konfigurasi Admin Panel

### 1. Ubah Kredensial Admin Default

**⚠️ PENTING: Ubah credentials ini sebelum production!**

**File**: `admin/auth-admin.js`

Cari fungsi `validateSecureAdminCredentials`:

```javascript
// SEBELUM (default credentials)
validateSecureAdminCredentials(username, password) {
    const validUsername = 'admin';
    const validPasswordPlain = 'admin123Secure!@#';
    const expectedHash = CryptoJS.SHA256(validPasswordPlain + validUsername).toString();
    return username === validUsername && password === expectedHash;
}

// SESUDAH (custom credentials)
validateSecureAdminCredentials(username, password) {
    const validUsername = 'your_admin_username';      // ← Ubah ini
    const validPasswordPlain = 'your_secure_password'; // ← Ubah ini
    const expectedHash = CryptoJS.SHA256(validPasswordPlain + validUsername).toString();
    return username === validUsername && password === expectedHash;
}
```

### 2. Konfigurasi Security Settings

**File**: `admin/auth-admin.js` - Constructor

```javascript
constructor() {
    this.sessionTimeout = 30 * 60 * 1000;      // 30 menit
    this.maxLoginAttempts = 5;                  // 5 percobaan
    this.lockoutDuration = 15 * 60 * 1000;     // 15 menit lockout
}
```

**Customize:**

```javascript
constructor() {
    this.sessionTimeout = 60 * 60 * 1000;      // 1 hour
    this.maxLoginAttempts = 3;                  // 3 attempts (stricter)
    this.lockoutDuration = 30 * 60 * 1000;     // 30 minutes lockout
}
```

### 3. Create Environment Configuration

**File**: `admin/.env.local`

```env
# Application
APP_ENV=development
APP_DEBUG=true
APP_URL=http://localhost:8000

# Security
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password
SESSION_TIMEOUT=1800
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nihongo_bizzare
DB_PORT=3306

# API
API_BASE_URL=http://localhost:8000/admin/api
API_TIMEOUT=5000

# SSL/TLS
SSL_ENABLED=false
SSL_CERT_PATH=
SSL_KEY_PATH=

# Email (untuk notifications)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM=admin@nihongobizzare.com

# Backup
BACKUP_ENABLED=true
BACKUP_PATH=/backups
BACKUP_SCHEDULE=daily
```

### 4. Create Config PHP File

**File**: `admin/config/config.php`

```php
<?php
// Load environment variables from .env.local
$envFile = __DIR__ . '/../.env.local';

if (file_exists($envFile)) {
    $env = parse_ini_file($envFile);
    foreach ($env as $key => $value) {
        putenv("$key=$value");
    }
}

// Define constants
define('APP_ENV', getenv('APP_ENV') ?: 'development');
define('APP_DEBUG', getenv('APP_DEBUG') === 'true');
define('APP_URL', getenv('APP_URL') ?: 'http://localhost:8000');

// Security
define('SESSION_TIMEOUT', intval(getenv('SESSION_TIMEOUT')) ?: 1800);
define('MAX_LOGIN_ATTEMPTS', intval(getenv('MAX_LOGIN_ATTEMPTS')) ?: 5);
define('LOCKOUT_DURATION', intval(getenv('LOCKOUT_DURATION')) ?: 900);

// Database
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASSWORD', getenv('DB_PASSWORD') ?: '');
define('DB_NAME', getenv('DB_NAME') ?: 'nihongo_bizzare');

// API
define('API_BASE_URL', getenv('API_BASE_URL') ?: 'http://localhost:8000/admin/api');
define('API_TIMEOUT', intval(getenv('API_TIMEOUT')) ?: 5000);

// File uploads
define('MAX_UPLOAD_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx']);
define('UPLOAD_DIR', __DIR__ . '/../uploads/');

// Timezone
date_default_timezone_set('Asia/Jakarta');

// Error handling
if (APP_DEBUG) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
?>
```

---

## Security Setup

### 1. Enable HTTPS

**Development (Self-signed Certificate):**

```bash
# Generate certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Apache config
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile "/path/to/cert.pem"
    SSLCertificateKeyFile "/path/to/key.pem"
</VirtualHost>
```

**Production (Let's Encrypt):**

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-apache

# Get certificate
sudo certbot certonly --apache -d yourdomain.com -d www.yourdomain.com

# Auto-renew
sudo certbot renew --dry-run
```

### 2. Security Headers

**Apache (.htaccess)**:

```apache
# Prevent clickjacking
Header always set X-Frame-Options "SAMEORIGIN"

# Prevent MIME type sniffing
Header always set X-Content-Type-Options "nosniff"

# Enable XSS protection
Header always set X-XSS-Protection "1; mode=block"

# Referrer policy
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Feature policy
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"

# Strict transport security (only HTTPS)
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"

# Content security policy
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com"
```

### 3. Password Hashing (PHP)

```php
// Hash password untuk database
$password = "YourSecurePassword123!";
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);

// Verify password
$passwordFromForm = "YourSecurePassword123!";
if (password_verify($passwordFromForm, $hash)) {
    echo "Password is correct!";
}
```

### 4. SQL Injection Prevention

```php
// ✓ SAFE: Using prepared statements
$username = $_POST['username'];
$stmt = $conn->prepare("SELECT * FROM admins WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// ✓ SAFE: Using parameterized queries
$email = $_POST['email'];
$query = "SELECT * FROM admins WHERE email = ?";
$result = $conn->query($query, [$email]);

// ✗ UNSAFE: Direct concatenation
$query = "SELECT * FROM admins WHERE username = '" . $_POST['username'] . "'";
```

### 5. XSS Prevention

```javascript
// ✓ SAFE: Use textContent instead of innerHTML
document.getElementById('name').textContent = userInput;

// ✗ UNSAFE: Using innerHTML with untrusted data
document.getElementById('name').innerHTML = userInput;

// ✓ SAFE: Sanitize HTML
function sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}
```

---

## Testing

### 1. Test Login Flow

**Steps:**
1. Buka `http://localhost:8000/admin/admin-login.html`
2. Enter default credentials:
   - Username: `admin`
   - Password: `admin123Secure!@#`
3. Verification:
   - ✓ Should redirect ke dashboard
   - ✓ Session cookie created
   - ✓ Admin name displayed di topbar

**Error Scenarios:**
```
- Wrong username → "Username atau password salah"
- Wrong password → "Username atau password salah"
- 5 failed attempts → "Account locked for 15 minutes"
- After lockout expires → Login should work again
```

### 2. Test Dashboard Features

**File**: `admin/test-security.html`

```
Comprehensive tests:
✓ Session validation
✓ Rate limiting
✓ Password hashing
✓ CSRF protection
✓ Login simulation
```

**File**: `admin/test-burger-menu.html`

```
Navigation tests:
✓ Desktop menu collapse/expand
✓ Mobile menu overlay
✓ Logout redirect
✓ Screen size detection
```

### 3. Unit Tests (Optional)

**File**: `admin/tests/test.js`

```javascript
// Test helper
function test(name, fn) {
    try {
        fn();
        console.log(`✓ ${name}`);
        return true;
    } catch(e) {
        console.error(`✗ ${name}: ${e.message}`);
        return false;
    }
}

// Example tests
test('Admin authentication', () => {
    const auth = new AdminAuthSystem();
    assert(typeof auth.isSecurelyAuthenticated === 'function');
});

test('Session encryption', () => {
    const data = { username: 'admin' };
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'key');
    assert(encrypted.toString().length > 0);
});
```

### 4. Security Audit

```javascript
// Check in browser console (F12)

// 1. Check HTTPS
console.log('HTTPS:', window.location.protocol === 'https:' ? '✓' : '✗');

// 2. Check security headers
fetch(window.location).then(r => {
    console.log('X-Frame-Options:', r.headers.get('X-Frame-Options'));
    console.log('X-Content-Type-Options:', r.headers.get('X-Content-Type-Options'));
    console.log('CSP:', r.headers.get('Content-Security-Policy'));
});

// 3. Check localStorage encryption
console.log('Session encrypted:', localStorage.getItem('secureAdminSession').length > 100);

// 4. Check CSRF token
console.log('CSRF token:', !!document.querySelector('meta[name="csrf-token"]'));
```

---

## Deployment

### Pre-Deployment Checklist

```
Security:
  [ ] Database setup & migration complete
  [ ] Environment variables configured
  [ ] HTTPS enabled
  [ ] Security headers configured
  [ ] Admin credentials changed from default
  [ ] Password hashing implemented
  [ ] SQL injection prevention in place
  [ ] XSS prevention implemented
  
Database:
  [ ] Database backed up
  [ ] Indexes created
  [ ] Foreign keys verified
  [ ] Test data removed
  
Testing:
  [ ] All login scenarios tested
  [ ] Dashboard features working
  [ ] API endpoints verified
  [ ] Load testing completed
  [ ] Error handling tested
  
Documentation:
  [ ] README created
  [ ] API documentation complete
  [ ] Deployment guide written
  [ ] Rollback procedure documented
```

### Deployment Steps

#### Step 1: Prepare Production Server

```bash
# Connect to server
ssh user@yourdomain.com

# Create project directory
mkdir -p /var/www/nihongobizzare-web
cd /var/www/nihongobizzare-web

# Set permissions
chown -R www-data:www-data /var/www/nihongobizzare-web
chmod -R 755 /var/www/nihongobizzare-web
```

#### Step 2: Deploy Files

**Option A: Using Git**

```bash
cd /var/www/nihongobizzare-web
git clone https://github.com/username/nihongobizzare-web.git .
git checkout production
```

**Option B: Using SCP**

```bash
scp -r ./nihongobizzare-web user@yourdomain.com:/var/www/
```

**Option C: Using FTP**

```
1. Connect dengan FileZilla
2. Upload semua files ke /public_html/
3. Set permissions: folders 755, files 644
```

#### Step 3: Setup Database

```bash
# SSH ke server
ssh user@yourdomain.com

# Import database
mysql -u dbuser -p databasename < admin/data/DATABASE_SCHEMA.sql

# Verify tables
mysql -u dbuser -p -e "USE databasename; SHOW TABLES;"
```

#### Step 4: Configure Web Server

**Nginx:**

```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/nihongobizzare
sudo ln -s /etc/nginx/sites-available/nihongobizzare /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Apache:**

```bash
# Copy Apache config
sudo cp apache.conf /etc/apache2/sites-available/nihongobizzare.conf
sudo a2ensite nihongobizzare
sudo a2enmod rewrite
sudo a2enmod ssl
sudo apache2ctl configtest
sudo systemctl restart apache2
```

#### Step 5: SSL Certificate

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-{apache|nginx}

# Get certificate
sudo certbot certonly --{apache|nginx} -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

#### Step 6: Environment Configuration

```bash
# SSH ke server
ssh user@yourdomain.com

# Create .env.production
cat > /var/www/nihongobizzare-web/admin/.env.production << EOF
APP_ENV=production
DB_HOST=localhost
DB_NAME=nihongo_prod
DB_USER=dbuser
DB_PASSWORD=strongpassword
SSL_ENABLED=true
EOF

# Restrict access
chmod 600 /var/www/nihongobizzare-web/admin/.env.production
```

#### Step 7: Verify Deployment

```bash
# Check website
curl https://yourdomain.com

# Check admin
curl https://yourdomain.com/admin/index.html

# Check logs
tail -f /var/log/apache2/error.log
tail -f /var/log/nginx/error.log
```

### Rollback Procedure

```bash
# If something goes wrong, rollback ke version sebelumnya
cd /var/www/nihongobizzare-web
git log --oneline
git checkout <previous-commit>
systemctl restart apache2  # or nginx
```

---

## Troubleshooting

### Common Issues & Solutions

#### 1. Admin Login Page Blank

**Причина**: CryptoJS library tidak load

**Solusi**:
```html
<!-- Verify di HTML source -->
<!-- Check console for errors -->

<!-- Add fallback CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
```

#### 2. "Session Expired" Error

**Penyebab**: Session timeout terlalu singkat

**Solusi**:
```javascript
// Extend timeout di auth-admin.js
this.sessionTimeout = 60 * 60 * 1000;  // Ubah ke 1 hour

// Or extend session on activity
setInterval(() => { authSystem.extendSession(); }, 5 * 60 * 1000);
```

#### 3. "Permission Denied" saat Upload

**Penyebab**: Folder tidak writable

**Solusi**:
```bash
# Linux/Mac
chmod -R 755 admin/uploads/
chown -R www-data:www-data admin/uploads/

# Windows (WSL)
sudo chown www-data:www-data /mnt/c/Project/uploads/
sudo chmod 755 /mnt/c/Project/uploads/
```

#### 4. Database Connection Error

**Penyebab**: MySQL tidak running

**Solusi**:
```bash
# Start MySQL
sudo systemctl start mysql      # Linux
mysql.server start              # Mac
# XAMPP Control Panel Start    # Windows

# Test connection
mysql -u root -p -h localhost
```

#### 5. 404 Error di Admin Pages

**Penyebab**: Folder structure tidak benar

**Solusi**:
```bash
# Verify structure
ls -la admin/
ls -la admin/js/
ls -la admin/css/

# Check file permissions
chmod 644 admin/*.html
chmod 755 admin/
```

#### 6. CORS Error saat API Call

**Penyebab**: CORS headers tidak configured

**Solusi**:
```apache
# Add to .htaccess
Header set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header set Access-Control-Allow-Headers "Content-Type, Authorization"
```

---

## FAQ

### Q: Berapa default credentials admin?

**A**:
- Username: `admin`
- Password: `admin123Secure!@#`

⚠️ **UBAH SEBELUM PRODUCTION!**

### Q: Bagaimana reset password admin?

**A**:

Via PHP:
```php
$newPassword = "NewPassword123!";
$hash = password_hash($newPassword, PASSWORD_BCRYPT);

$query = "UPDATE admins SET password_hash = '$hash' WHERE username = 'admin'";
$conn->query($query);
```

Via MySQL:
```sql
UPDATE admins SET password_hash = '$2y$10$...' WHERE username = 'admin';
```

### Q: Bandingkan localStorage vs Database?

**A**:

| Feature | localStorage | Database |
|---------|-------------|----------|
| Persistence | ✓ Per browser | ✓ Global |
| Storage | 5-10 MB | Unlimited |
| Security | ⚠️ Client-side | ✓ Server-side |
| Speed | ✓ Fast | Slower (network) |
| Multi-user | ✗ No | ✓ Yes |
| Production | ✗ No | ✓ Yes |

### Q: Bagaimana backup database otomatis?

**A**:

**Linux Cron Job**:
```bash
# Edit crontab
crontab -e

# Add backup job (setiap hari jam 2 AM)
0 2 * * * mysqldump -u root -p'password' nihongo_bizzare > /backups/db_$(date +\%Y\%m\%d).sql 2>> /backups/backup.log
```

**Windows Task Scheduler**:
```batch
:: Create batch file backup.bat
@echo off
mysqldump -u root -p"password" nihongo_bizzare > C:\backups\db_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql

:: Schedule via Task Scheduler
:: New Task → Run backup.bat → Trigger: Daily 2:00 AM
```

### Q: Bagaimana monitoring uptime?

**A**:

```php
// admin/api/health-check.php
<?php
header('Content-Type: application/json');

$checks = [
    'database' => checkDatabase(),
    'storage' => checkStorage(),
    'memory' => checkMemory(),
    'timestamp' => date('Y-m-d H:i:s')
];

// If all checks pass
$allOk = array_reduce($checks, fn($carry, $item) => $carry && $item, true);
http_response_code($allOk ? 200 : 503);
echo json_encode($checks);

function checkDatabase() {
    try {
        $conn = new mysqli('localhost', 'root', '', 'nihongo_bizzare');
        return $conn->ping();
    } catch (Exception $e) {
        return false;
    }
}

function checkStorage() {
    return disk_free_space('/') > 1000000000; // > 1GB
}

function checkMemory() {
    $free = shell_exec('free | grep Mem | awk \'{print $3/$2 * 100.0}\'');
    return intval($free) < 80; // < 80% used
}
?>
```

Monitor dengan:
```bash
# Check setiap 5 menit
*/5 * * * * curl https://yourdomain.com/admin/api/health-check.php >> /var/log/health_check.log
```

### Q: Multi-admin dengan roles berbeda?

**A**:

```php
// Insert admins dengan roles
INSERT INTO admins (username, email, password_hash, role)
VALUES 
    ('admin', 'admin@domain.com', '$hash', 'administrator'),
    ('editor', 'editor@domain.com', '$hash', 'editor'),
    ('viewer', 'viewer@domain.com', '$hash', 'viewer');

// Check permissions
function hasPermission($conn, $adminId, $permission) {
    $query = "SELECT * FROM admin_permissions 
              WHERE admin_id = $adminId AND permission = '$permission'";
    return $conn->query($query)->num_rows > 0;
}
```

### Q: Struktur folder uploads bagaimana?

**A**:

```
public/
├── uploads/
│   ├── articles/        # Article images
│   │   └── 2024/
│   │       ├── 01/
│   │       └── 02/
│   ├── avatars/         # User avatars
│   ├── documents/       # PDF, docs
│   └── temp/            # Temporary files
├── .htaccess            # Protect folder
└── index.php            # Download handler
```

**htaccess untuk security:**
```apache
<FilesMatch "\.php$">
    Deny from all
</FilesMatch>

<FilesMatch "\.(jpg|jpeg|png|gif|pdf)$">
    Allow from all
</FilesMatch>
```

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PHP Security Best Practices](https://www.php.net/manual/en/security.php)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Apache mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

**Version**: 1.0.0  
**Last Updated**: March 8, 2026  
**Status**: ✅ Production Ready  
**Author**: Nihongo Bizzare Team