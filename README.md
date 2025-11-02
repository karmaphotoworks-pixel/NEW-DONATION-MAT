# 🎮 Donation Webhook Server for Roblox

Webhook server untuk menerima donasi dari **Saweria/Sociabuzz** dan menampilkan notifikasi di game **Roblox**.

## 📋 Features

- ✅ Menerima webhook POST dari Saweria/Sociabuzz
- ✅ Menyimpan donasi terbaru di memory
- ✅ API endpoint untuk Roblox polling
- ✅ CORS enabled untuk akses dari Roblox
- ✅ Logging lengkap untuk debugging
- ✅ Support pagination untuk list donasi

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd donation-webhook-vercel
```

### 2. Deploy ke Vercel

**Via GitHub:**
1. Push repository ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import project dari GitHub
4. Deploy otomatis!

**Via Vercel CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 3. Setup Webhook di Saweria/Sociabuzz

**URL Webhook:**
```
https://your-app-name.vercel.app/api/webhook
```

Masukkan URL ini ke dashboard Saweria/Sociabuzz Anda.

## 📡 API Endpoints

### 1. Homepage
```
GET /
```
Homepage dengan dokumentasi endpoint.

### 2. Webhook Receiver
```
POST /api/webhook
Content-Type: application/json

{
  "donatur": "John Doe",
  "jumlah": 50000,
  "pesan": "Semangat terus!",
  "timestamp": "2025-11-02T12:00:00Z"
}
```

### 3. Get Latest Donation
```
GET /api/latest-donation
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "1730544000000",
    "donatur": "John Doe",
    "jumlah": 50000,
    "pesan": "Semangat terus!",
    "timestamp": "2025-11-02T12:00:00Z",
    "receivedAt": "2025-11-02T12:00:01.123Z"
  }
}
```

### 4. Get All Donations
```
GET /api/donations?limit=20&page=1
```

Response:
```json
{
  "success": true,
  "total": 50,
  "page": 1,
  "limit": 20,
  "data": [...]
}
```

## 🎮 Setup di Roblox

### 1. Enable HTTP Requests
- Game Settings → Security → ✅ Allow HTTP Requests

### 2. ServerScript (ServerScriptService)
```lua
local WEBHOOK_URL = "https://your-app.vercel.app/api/latest-donation"
-- Lihat file dokumentasi Roblox untuk kode lengkap
```

### 3. LocalScript (StarterPlayerScripts)
```lua
-- Script untuk menampilkan notifikasi
-- Lihat file dokumentasi Roblox untuk kode lengkap
```

## 🧪 Testing

### Test dengan cURL:
```bash
curl -X POST https://your-app.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"donatur":"Test User","jumlah":25000,"pesan":"Test donation"}'
```

### Test dengan Browser:
```
https://your-app.vercel.app/api/latest-donation
```

## ⚠️ Catatan Penting

### Memory Storage Limitation
- Data disimpan di **memory** (global variable)
- Data akan **hilang** saat serverless function restart
- Untuk production, gunakan database:
  - [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
  - [MongoDB Atlas](https://www.mongodb.com/atlas)
  - [Supabase](https://supabase.com)

### Alternative: Vercel KV (Redis)
Untuk menyimpan data permanen:
1. Install Vercel KV di dashboard
2. Update `storage.js` untuk gunakan KV
3. Data tidak akan hilang saat restart

## 📁 File Structure

```
donation-webhook-vercel/
├── api/
│   ├── index.js              # Homepage
│   ├── webhook.js            # Receive donations
│   ├── latest-donation.js    # Get latest
│   ├── donations.js          # Get all
│   └── storage.js            # Storage module
├── package.json              # Dependencies
├── vercel.json               # Vercel config
├── .gitignore                # Git ignore
└── README.md                 # Documentation
```

## 🔍 Monitoring & Debugging

### View Logs di Vercel:
1. Dashboard → Your Project
2. Tab **"Logs"** atau **"Functions"**
3. Real-time logs setiap request

### Check di Roblox:
1. Roblox Studio → View → Output
2. Lihat console logs

## 🆘 Troubleshooting

**❌ Error 405 Method Not Allowed**
- Pastikan menggunakan POST untuk `/api/webhook`
- Pastikan menggunakan GET untuk endpoints lainnya

**❌ Error 401 Unauthorized**
- API key tidak cocok (jika enabled)
- Hapus validasi API key jika tidak perlu

**❌ Data hilang setelah beberapa waktu**
- Normal untuk memory storage
- Gunakan database untuk data permanen

**❌ Roblox tidak bisa akses webhook**
- Pastikan HTTP Requests enabled di Game Settings
- Check URL webhook sudah benar

## 📞 Support

Jika ada masalah:
1. Cek logs di Vercel dashboard
2. Cek Output di Roblox Studio
3. Test manual dengan cURL/Postman

## 📄 License

MIT License - feel free to use for your projects!

---

Made with ❤️ for Roblox Donation System
