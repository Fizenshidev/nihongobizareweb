# 🚀 Deployment Panduan - Production Ready

Lengkap panduan untuk deploy Dashboard Admin ke server production.

## 📋 Pre-Deployment Checklist

```
SECURITY & CREDENTIALS:
  [ ] Admin credentials changed from default
  [ ] Database password set (strong password)
  [ ] SSL/TLS certificates ready
  [ ] Environment variables configured
  [ ] .env.production file created
  [ ] API keys secured

DATABASE:
  [ ] Database created
  [ ] Tables migrated
  [ ] Indexes created
  [ ] Initial data imported
  [ ] Backup strategy defined
  [ ] Connection tested

CODE QUALITY:
  [ ] All features tested locally
  [ ] Console.logs removed
  [ ] Debug mode disabled
  [ ] Error handling proper
  [ ] Performance optimized

INFRASTRUCTURE:
  [ ] Web server configured
  [ ] PHP 7.4+ installed
  [ ] MySQL 5.7+ installed
  [ ] Disk space available (>20GB)
  [ ] Backup storage ready
  [ ] Monitoring tools setup

DOCUMENTATION:
  [ ] README updated
  [ ] API docs complete
  [ ] Deployment guide written
  [ ] Rollback procedure documented
```

---

## 🌍 Pilih Hosting Platform

### Option 1: VPS (Recommended)

**Providers:**
- DigitalOcean
- Linode
- Vultr
- AWS EC2
- Google Cloud

**Setup:**
```bash
# 1. Create instance
# 2. SSH ke server
ssh root@your-server-ip

# 3. Update system
sudo apt update && sudo apt upgrade -y

# 4. Install dependencies
sudo apt install -y apache2 mysql-server php php-mysql php-mbstring php-curl

# 5. Enable modules
sudo a2enmod rewrite ssl

# 6. Start services
sudo systemctl start apache2 mysql-server
sudo systemctl enable apache2 mysql-server
```

### Option 2: Shared Hosting

**Providers:**
- Bluehost
- HostGator
- SiteGround
- Namecheap
- DomainKom

**Setup:**
1. Upload files via FTP/cPanel
2. Create database via cPanel → MySQL
3. Configure domain
4. Enable SSL di cPanel

### Option 3: Docker Container

**Dockerfile:**
```dockerfile
FROM php:7.4-apache

RUN docker-php-ext-install mysqli pdo_mysql

COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

RUN a2enmod rewrite ssl

EXPOSE 80 443

CMD ["apache2-foreground"]
```

**Build & Run:**
```bash
docker build -t nihongo-bizzare .
docker run -d -p 80:80 -p 443:443 -e DB_HOST=db -e DB_NAME=nihongo nihongo-bizzare
```

---

## 📤 Upload Files

### Method 1: Git (Modern Approach)

**Setup Git Repo:**
```bash
# Setup SSH keys on server
ssh-keygen -t ed25519 -C "deploy@yourdomain.com"
cat ~/.ssh/id_ed25519.pub  # Copy ke GitHub Deploy Keys

# Clone repository
cd /var/www
git clone git@github.com:username/nihongobizzare-web.git
cd nihongobizzare-web
git checkout production
```

**Auto-Deploy dengan Webhook:**
```bash
# Buat deploy script
cat > /var/www/deploy.sh << 'EOF'
#!/bin/bash
cd /var/www/nihongobizzare-web
git pull origin production
npm run build  # If needed
systemctl restart apache2
EOF

chmod +x /var/www/deploy.sh

# Setup GitHub webhook
# GitHub → Settings → Webhooks → Add webhook
# Payload URL: https://yourdomain.com/deploy.php
```

**Deploy Handler:**
```php
<?php
// /var/www/deploy.php
if ($_SERVER['HTTP_X_HUB_SIGNATURE'] !== 'sha1=' . hash_hmac('sha1', file_get_contents('php://input'), 'your-secret')) {
    exit('Unauthorized');
}

shell_exec('/var/www/deploy.sh');
echo "Deploy successful";
?>
```

### Method 2: FTP Upload

**Windows (FileZilla):**
```
1. File → Site Manager
2. New Site
3. Protocol: SFTP
4. Host: your-server-ip
5. Port: 22
6. Username/Password: your-ssh-credentials
7. Connect
8. Browse to /var/www/html
9. Drag & drop files
```

**Linux/Mac (SFTP CLI):**
```bash
sftp -r ./nihongobizzare-web root@your-server-ip:/var/www/
```

### Method 3: cPanel/Plesk File Manager

```
1. Login ke cPanel
2. File Manager
3. Navigate ke public_html
4. Upload folder nihongobizzare-web
5. Extract if needed
6. Set permissions (755 for folders, 644 for files)
```

---

## 🗄️ Database Migration

### Step 1: Create Database on Server

```bash
# SSH ke server
ssh root@your-server-ip

# Login MySQL
mysql -u root -p

# Create database
CREATE DATABASE nihongo_bizzare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nihongo_user'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON nihongo_bizzare.* TO 'nihongo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 2: Import Schema

```bash
# Upload DATABASE_SCHEMA.sql ke server
scp admin/data/DATABASE_SCHEMA.sql root@your-server-ip:/tmp/

# Import
ssh root@your-server-ip
mysql -u nihongo_user -p nihongo_bizzare < /tmp/DATABASE_SCHEMA.sql

# Verify
mysql -u nihongo_user -p -e "USE nihongo_bizzare; SHOW TABLES;"
```

### Step 3: Create Admin Account

```php
// admin/setup/create-admin.php
<?php
require_once '../config/database.php';

$username = 'admin';
$email = 'admin@yourdomain.com';
$password = 'your_secure_password_here';
$password_hash = password_hash($password, PASSWORD_BCRYPT);

$query = "INSERT INTO admins (username, email, password_hash, role, status) 
          VALUES ('$username', '$email', '$password_hash', 'administrator', 'active')";

if ($conn->query($query)) {
    echo "Admin created successfully!";
    echo "Username: $username<br>";
    echo "Password: $password<br>";
    echo "⚠️ Change password after first login!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
```

Access: `https://yourdomain.com/admin/setup/create-admin.php`

---

## 🔒 Security Configuration

### 1. Setup HTTPS

**Let's Encrypt with Certbot:**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache

# Get certificate
sudo certbot certonly --apache -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer

# Test renewal
sudo certbot renew --dry-run
```

### 2. Configure Web Server

**Apache VirtualHost:**

```apache
# /etc/apache2/sites-available/nihongobizzare.conf

<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    
    # Force HTTPS
    Redirect permanent / https://yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/nihongobizzare-web
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/yourdomain.com/chain.pem
    
    # Security Headers
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    
    # Enable mod_rewrite
    <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^(.*)$ index.html [L]
    </IfModule>
    
    # Gzip Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
    </IfModule>
    
    # Cache Headers
    <FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$">
        Header set Cache-Control "max-age=2592000, public"
    </FilesMatch>
    
    ErrorLog ${APACHE_LOG_DIR}/yourdomain_error.log
    CustomLog ${APACHE_LOG_DIR}/yourdomain_access.log combined
</VirtualHost>
```

**Enable dan Test:**

```bash
sudo a2ensite nihongobizzare
sudo a2enmod ssl rewrite headers deflate
sudo apache2ctl configtest
sudo systemctl restart apache2
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/nihongobizzare-web;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    access_log /var/log/nginx/yourdomain_access.log;
    error_log /var/log/nginx/yourdomain_error.log;
}
```

### 3. Configure Environment Variables

**Create .env.production:**

```bash
cat > /var/www/nihongobizzare-web/admin/.env.production << EOF
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_HOST=localhost
DB_USER=nihongo_user
DB_PASSWORD=$(openssl rand -base64 32)
DB_NAME=nihongo_bizzare

API_BASE_URL=https://yourdomain.com/admin/api
API_TIMEOUT=5000

SESSION_TIMEOUT=1800
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=900

SSL_ENABLED=true
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
EOF

# Restrict access
sudo chmod 600 /var/www/nihongobizzare-web/admin/.env.production
sudo chown www-data:www-data /var/www/nihongobizzare-web/admin/.env.production
```

### 4. Set File Permissions

```bash
# SSH ke server
ssh root@your-server-ip

# Set ownership
sudo chown -R www-data:www-data /var/www/nihongobizzare-web

# Set permissions
sudo chmod -R 755 /var/www/nihongobizzare-web
sudo chmod -R 755 /var/www/nihongobizzare-web/admin

# Make writable directories
sudo chmod -R 775 /var/www/nihongobizzare-web/admin/uploads
sudo chmod -R 775 /var/www/nihongobizzare-web/admin/data
sudo chmod -R 775 /var/www/nihongobizzare-web/public/uploads

# Restrict sensitive files
sudo chmod 600 /var/www/nihongobizzare-web/admin/.env.production
sudo chmod 600 /var/www/nihongobizzare-web/admin/config/database.php
```

---

## 📊 Monitoring & Logging

### Setup Log Rotation

```bash
# Create logrotate config
sudo cat > /etc/logrotate.d/nihongobizzare << EOF
/var/log/apache2/yourdomain_access.log
/var/log/apache2/yourdomain_error.log
{
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        if /etc/init.d/apache2 status > /dev/null; then /etc/init.d/apache2 reload; fi;
    endscript
}
EOF
```

### Monitor Real-Time Logs

```bash
# Apache errors
sudo tail -f /var/log/apache2/yourdomain_error.log

# Access logs
sudo tail -f /var/log/apache2/yourdomain_access.log

# PHP errors
sudo tail -f /var/log/php-fpm.log

# MySQL errors
sudo tail -f /var/log/mysql/error.log
```

### Setup Automated Backups

```bash
# Create backup script
cat > /usr/local/bin/backup-nihongo.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/backups/nihongo-bizzare"
DB_NAME="nihongo_bizzare"
DB_USER="nihongo_user"
DB_PASSWORD="$DB_PASSWORD"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# Backup files
tar czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/nihongobizzare-web

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/backup-nihongo.sh

# Add to crontab (daily 2 AM)
echo "0 2 * * * /usr/local/bin/backup-nihongo.sh" | sudo tee -a /etc/crontab
```

---

## ✅ Verify Deployment

### Test Website

```bash
# Test HTTPS
curl -I https://yourdomain.com

# Test admin panel
curl -I https://yourdomain.com/admin/index.html

# Test security headers
curl -I https://yourdomain.com | grep -E "X-Frame-Options|X-Content-Type|Strict-Transport"

# SSL check
openssl s_client -connect yourdomain.com:443 -tls1_2
```

### Check Services

```bash
# Apache status
sudo systemctl status apache2

# MySQL status
sudo systemctl status mysql

# SSL certificate validity
sudo certbot certificates

# Firewall
sudo ufw status
```

### Browser Testing

1. **HTTPS**
   - ✅ Green lock icon
   - ✅ No certificate warnings

2. **Admin Login**
   ```
   https://yourdomain.com/admin/admin-login.html
   Username: admin (or custom)
   Password: your-password
   ```

3. **Dashboard**
   - ✅ All pages load
   - ✅ Responsive on mobile

4. **Security**
   - ✅ No console errors
   - ✅ No mixed content warnings

---

## 🔄 Rollback Procedure

**Jika ada masalah setelah deployment:**

### From Git

```bash
# SSH ke server
ssh root@your-server-ip

# Check history
cd /var/www/nihongobizzare-web
git log --oneline | head -10

# Rollback ke version sebelumnya
git revert HEAD
git push origin production

# Or rollback ke specific commit
git checkout abc123def456
systemctl restart apache2
```

### Manual Rollback

```bash
# Restore dari backup
cd /backups
tar xzf files_backup_date.tar.gz -C /var/www/

# Restore database
mysql -u nihongo_user -p nihongo_bizzare < db_backup_date.sql

# Restart services
sudo systemctl restart apache2 mysql
```

---

## 📈 Performance Tuning

### PHP-FPM Optimization

```bash
# /etc/php/7.4/fpm/pool.d/www.conf
pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.max_requests = 500
```

### MySQL Optimization

```sql
-- Optimize tables
OPTIMIZE TABLE admins;
OPTIMIZE TABLE articles;

-- Check table size
SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) AS size_mb
FROM information_schema.tables
WHERE table_schema = 'nihongo_bizzare';
```

### Cache Configuration

```apache
# .htaccess
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresDefault "access plus 1 day"
    ExpiresByType text/html "access plus 1 hour"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType text/css "access plus 2 weeks"
    ExpiresByType application/javascript "access plus 2 weeks"
</IfModule>
```

---

## 🆘 Troubleshooting

### 404 Errors

```bash
# Check file permissions
ls -la /var/www/nihongobizzare-web/admin/

# Check .htaccess
cat /var/www/nihongobizzare-web/.htaccess

# Enable mod_rewrite
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Database Connection Error

```bash
# Test connection
mysql -u nihongo_user -p -h localhost

# Check credentials in .env.production
cat /var/www/nihongobizzare-web/admin/.env.production

# Test with telnet
telnet localhost 3306
```

### SSL Certificate Issues

```bash
# Check certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Force renewal
sudo certbot renew --force-renewal
```

### High Server Load

```bash
# Check CPU/Memory
top
free -h
df -h

# Check running processes
ps aux | grep php
ps aux | grep mysql

# Check MySQL query log
mysqldumpslow -s c -t 10 /var/log/mysql/query.log
```

---

## 📞 Support

- **Documentation**: [INSTALLATION_GUIDE.md](../INSTALLATION_GUIDE.md)
- **Security**: [ADMIN_SECURITY_README.md](./ADMIN_SECURITY_README.md)
- **Quick Start**: [QUICK_START.md](./QUICK_START.md)

---

**Version**: 1.0.0  
**Last Updated**: March 8, 2026  
**Status**: ✅ Production Ready