// api/index.js
// Homepage - untuk cek apakah server jalan

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Donation Webhook Server</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
          color: #333;
          margin-bottom: 10px;
          font-size: 32px;
        }
        .status {
          display: inline-block;
          background: #10b981;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: bold;
          margin-bottom: 30px;
        }
        .endpoint {
          background: #f3f4f6;
          border-left: 4px solid #667eea;
          padding: 15px;
          margin: 15px 0;
          border-radius: 5px;
        }
        .endpoint h3 {
          color: #667eea;
          margin-bottom: 5px;
          font-size: 16px;
        }
        .endpoint code {
          background: #1f2937;
          color: #10b981;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 14px;
          display: inline-block;
          margin-top: 5px;
        }
        .endpoint p {
          color: #6b7280;
          font-size: 14px;
          margin-top: 5px;
        }
        .info {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin-top: 20px;
          border-radius: 5px;
        }
        .info strong {
          color: #92400e;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #6b7280;
          font-size: 14px;
        }
        a {
          color: #667eea;
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎮 Donation Webhook Server</h1>
        <span class="status">✅ Server Running</span>
        
        <div class="endpoint">
          <h3>📥 Webhook Endpoint (POST)</h3>
          <code>/api/webhook</code>
          <p>Untuk menerima donasi dari Saweria/Sociabuzz</p>
        </div>

        <div class="endpoint">
          <h3>📤 Latest Donation (GET)</h3>
          <code>/api/latest-donation</code>
          <p>Untuk Roblox mengambil donasi terbaru</p>
        </div>

        <div class="endpoint">
          <h3>📋 All Donations (GET)</h3>
          <code>/api/donations</code>
          <p>Melihat semua donasi (untuk testing)</p>
        </div>

        <div class="info">
          <strong>⚠️ Catatan Penting:</strong><br>
          Vercel Serverless Functions tidak menyimpan data permanen. 
          Data donasi disimpan di memory dan akan hilang saat function restart.
          Untuk production, gunakan database seperti Vercel KV atau MongoDB.
        </div>

        <div class="footer">
          Made with ❤️ for Roblox Donation System<br>
          <a href="https://vercel.com" target="_blank">Powered by Vercel</a>
        </div>
      </div>
    </body>
    </html>
  `;

  res.status(200).send(html);
}
