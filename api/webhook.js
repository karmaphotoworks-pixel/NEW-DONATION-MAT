// api/webhook.js
// Endpoint untuk menerima webhook dari Saweria/Sociabuzz


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
      message: 'Method Not Allowed. Use POST to send donation data.' 
    });
  }

  try {
    const data = req.body;
    
    // Log data yang masuk (untuk debugging)
    console.log('═══════════════════════════════════════');
    console.log('📥 WEBHOOK RECEIVED');
    console.log('⏰ Time:', new Date().toISOString());
    console.log('📦 Data:', JSON.stringify(data, null, 2));
    console.log('═══════════════════════════════════════');

    // Validasi data minimal
    if (!data || typeof data !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format. Expected JSON object.'
      });
    }

    // Format donasi
const donation = {
  id: Date.now().toString(),
  donatur: data.donatur || data.donor_name || data.name || 'Anonymous',
  jumlah: parseInt(data.jumlah || data.amount || data.nominal || 0),
  pesan: data.pesan || data.message || data.comment || '',
  timestamp: data.timestamp || new Date().toISOString(),
  receivedAt: new Date().toISOString()
};

// Initialize global storage jika belum ada
if (!global.donationStorage) {
  global.donationStorage = {
    latest: null,
    all: []
  };
}

// Simpan sebagai latest
global.donationStorage.latest = donation;

// Tambah ke array all
global.donationStorage.all.unshift(donation);

// Batasi max 100 donasi
if (global.donationStorage.all.length > 100) {
  global.donationStorage.all = global.donationStorage.all.slice(0, 100);
}

    console.log('✅ DONATION SAVED:');
    console.log('   👤 Donatur:', donation.donatur);
    console.log('   💰 Jumlah: Rp', donation.jumlah.toLocaleString('id-ID'));
    console.log('   💬 Pesan:', donation.pesan || '(tidak ada pesan)');
    console.log('   🆔 ID:', donation.id);
    console.log('═══════════════════════════════════════\n');

    // Response sukses
    return res.status(200).json({
      success: true,
      message: 'Donation received and saved successfully! 🎉',
      data: donation
    });

  } catch (error) {
    console.error('❌ ERROR processing webhook:');
    console.error(error);
    console.error('═══════════════════════════════════════\n');
    
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}
