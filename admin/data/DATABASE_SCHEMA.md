# Admin Panel - Data Format Reference

## Database Schema

### Users Table
```
users
├── id (INT, PRIMARY KEY, AUTO INCREMENT)
├── username (VARCHAR 50, UNIQUE)
├── email (VARCHAR 100, UNIQUE)
├── password (VARCHAR 255, hashed)
├── fullName (VARCHAR 100)
├── avatar (VARCHAR 255)
├── joinDate (DATETIME)
├── lastLogin (DATETIME)
├── status (ENUM: 'active', 'inactive', 'suspended')
├── level (ENUM: 'admin', 'moderator', 'premium', 'regular')
└── createdAt (TIMESTAMP)
```

### Articles Table
```
articles
├── id (INT, PRIMARY KEY, AUTO INCREMENT)
├── title (VARCHAR 255)
├── slug (VARCHAR 255, UNIQUE)
├── content (LONGTEXT)
├── excerpt (TEXT)
├── category (VARCHAR 50)
├── author_id (INT, FOREIGN KEY)
├── image (VARCHAR 255)
├── tags (JSON)
├── views (INT, DEFAULT 0)
├── status (ENUM: 'draft', 'published', 'archived')
├── publishedAt (DATETIME)
├── createdAt (TIMESTAMP)
├── updatedAt (TIMESTAMP)
└── deletedAt (DATETIME)
```

### Comments Table
```
comments
├── id (INT, PRIMARY KEY, AUTO INCREMENT)
├── article_id (INT, FOREIGN KEY)
├── user_id (INT, FOREIGN KEY)
├── content (TEXT)
├── status (ENUM: 'pending', 'approved', 'rejected')
├── createdAt (TIMESTAMP)
└── updatedAt (TIMESTAMP)
```

### Analytics Table
```
analytics
├── id (INT, PRIMARY KEY, AUTO INCREMENT)
├── visitor_id (VARCHAR 255)
├── page (VARCHAR 255)
├── referrer (VARCHAR 255)
├── device (VARCHAR 50)
├── browser (VARCHAR 50)
├── os (VARCHAR 50)
├── country (VARCHAR 100)
├── city (VARCHAR 100)
├── sessionDuration (INT)
├── bounced (BOOLEAN)
├── timestamp (TIMESTAMP)
└── createdAt (DATETIME)
```

---

## API Endpoints (untuk backend)

### Articles
- `GET /api/admin/articles` - Dapatkan semua artikel
- `POST /api/admin/articles` - Buat artikel baru
- `PUT /api/admin/articles/:id` - Edit artikel
- `DELETE /api/admin/articles/:id` - Hapus artikel
- `GET /api/admin/articles/:id` - Dapatkan detail artikel

### Users
- `GET /api/admin/users` - Dapatkan semua pengguna
- `GET /api/admin/users/:id` - Dapatkan detail pengguna
- `PUT /api/admin/users/:id` - Edit pengguna
- `DELETE /api/admin/users/:id` - Hapus pengguna

### Analytics
- `GET /api/admin/analytics` - Dapatkan data analytics
- `GET /api/admin/analytics/traffic` - Traffic breakdown
- `GET /api/admin/analytics/devices` - Device analytics

### Database
- `POST /api/admin/database/backup` - Backup database
- `POST /api/admin/database/restore` - Restore database
- `POST /api/admin/database/optimize` - Optimize database
- `GET /api/admin/database/stats` - Database statistics

---

## JSON Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operasi berhasil",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Pesan error",
  "error": "ERROR_CODE"
}
```

---

## Authentication Headers

```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

---

## Roles & Permissions

### Administrator
- Akses penuh ke semua fitur
- Manajemen pengguna
- Manajemen database
- Pengaturan sistem

### Editor
- Upload dan edit artikel
- Moderasi komentar
- Lihat analytics

### Moderator
- Moderasi komentar
- Lihat analytics
- Edit artikel (limited)

---

## Backup Schedule

- Automatic: Daily at 2 AM
- Manual: Available anytime
- Retention: Last 30 days
- Storage: `/admin/data/backups/`

---

## Maintenance Notes

1. **Database Optimization**: Run weekly
2. **Backup Verification**: Check monthly
3. **Log Rotation**: Daily
4. **Cache Clearing**: Daily at 3 AM
