// api/webhook.js
// Endpoint untuk menerima webhook dari Sociabuzz/Saweria

// Storage sederhana di memory (untuk demo)
// CATATAN: Data akan hilang saat function restart
// Untuk production, gunakan database seperti Vercel KV atau MongoDB
let latestDonation = null;
let allDonations = [];

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Hanya terima POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method Not Allowed. Use POST.' 
    });
  }

  try {
    const data = req.body;
    
    // Log data yang masuk
    console.log('📥 Webhook received:', JSON.stringify(data, null, 2));
    console.log('⏰ Timestamp:', new Date().toISOString());

    // Format data donasi
    const donation = {
      id: Date.now().toString(), // ID unik berdasarkan timestamp
      donatur: data.donatur || data.donor_name || data.name || 'Anonymous',
      jumlah: parseInt(data.jumlah || data.amount || data.nominal || 0),
      pesan: data.pesan || data.message || data.comment || '',
      timestamp: data.timestamp || new Date().toISOString(),
      raw: data // Simpan data original untuk debugging
    };

    // Simpan sebagai donasi terbaru
    latestDonation = donation;
    
    // Tambah ke array (max 100 donasi)
    allDonations.unshift(donation);
    if (allDonations.length > 100) {
      allDonations = allDonations.slice(0, 100);
    }

    console.log('✅ Donation saved:', donation.donatur, '-', donation.jumlah);

    // Response sukses
    return res.status(200).json({
      success: true,
      message: 'Donation received successfully',
      data: donation
    });

  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}
