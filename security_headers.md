# 🛡️ Security Headers — Hosting Configuration Guide

คู่มือการตั้งค่า HTTP Security Headers เพื่อป้องกันการโจมตีจากแฮ็กเกอร์บนเซิร์ฟเวอร์/ผู้ให้บริการ Hosting

---

## Required Security Headers

| Header | Value | ป้องกันอะไร |
|--------|-------|-------------|
| `Content-Security-Policy` | ดูตัวอย่างด้านล่าง | XSS, Code Injection, Data Theft |
| `X-Frame-Options` | `DENY` | Clickjacking (ฝังเว็บใน iframe) |
| `X-Content-Type-Options` | `nosniff` | MIME Sniffing Attack |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | URL Leakage |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Force HTTPS (ป้องกัน Man-in-the-Middle) |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Unauthorized Device Access |

---

## Configuration by Hosting Provider

### 1. Vercel (`vercel.json`)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://line.me https://web.facebook.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none';" }
      ]
    }
  ]
}
```

---

### 2. Netlify (`netlify.toml` or `_headers`)

**`public/_headers`**:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://line.me https://web.facebook.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none';
```

---

### 3. Cloudflare Pages (`_headers`)

**`public/_headers`**:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://line.me https://web.facebook.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none';
```

---

### 4. Nginx (Server Block)

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://line.me https://web.facebook.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none';" always;

    # ... your other server config
}
```

---

### 5. Apache (`.htaccess`)

```apache
<IfModule mod_headers.c>
    Header always set X-Frame-Options "DENY"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
    Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://line.me https://web.facebook.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none';"
</IfModule>
```

---

## 🔒 What Each Header Protects Against

### Content-Security-Policy (CSP)
- ❌ ป้องกัน **XSS (Cross-Site Scripting)** — แฮ็กเกอร์ไม่สามารถฝังสคริปต์จาก domain ภายนอกเข้ามารันในเว็บได้
- ❌ ป้องกัน **Code Injection** — ไม่อนุญาตให้โหลดสคริปต์ จากแหล่งที่ไม่ได้อยู่ในรายการอนุญาต
- ❌ `object-src 'none'` — บล็อก Flash/Java Applet ที่ล้าสมัยและเป็นช่องโหว่
- ❌ `frame-ancestors 'none'` — ป้องกันไม่ให้เว็บถูกฝังใน iframe ของเว็บอื่น (Clickjacking)
- ❌ `base-uri 'self'` — ป้องกัน Base Tag Hijacking

### X-Frame-Options: DENY
- ❌ ป้องกัน **Clickjacking** — แฮ็กเกอร์ไม่สามารถซ่อนเว็บไซต์ของเราไว้ใน iframe แล้วหลอกให้ผู้ใช้กดปุ่มโดยไม่รู้ตัว

### Strict-Transport-Security (HSTS)
- ❌ ป้องกัน **Man-in-the-Middle (MITM)** — บังคับให้เบราว์เซอร์เข้าเว็บผ่าน HTTPS เสมอ ป้องกันการดักฟังข้อมูล
- ❌ ป้องกัน **SSL Stripping** — แฮ็กเกอร์ไม่สามารถ downgrade HTTPS เป็น HTTP ได้

### Permissions-Policy
- ❌ ป้องกัน **Unauthorized Device Access** — ไม่มีสคริปต์ใดสามารถเปิดกล้อง ไมโครโฟน หรือ GPS ของผู้ใช้โดยไม่ได้รับอนุญาต

### Referrer-Policy
- ❌ ป้องกัน **URL Information Leakage** — ไม่ส่ง URL เต็มรูปแบบไปยังเว็บภายนอก ลดความเสี่ยงในการเปิดเผยข้อมูลส่วนตัว
