// api/latest-donation.js
// Endpoint untuk Roblox mengambil donasi terbaru


export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Hanya terima GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method Not Allowed. Use GET.' 
    });
  }

  try {
// Akses global storage
const allDonations = global.donationStorage?.all || [];

// Pagination
const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;
const paginatedDonations = allDonations.slice(startIndex, endIndex);
    
    // Jika tidak ada donasi
    if (!latestDonation) {
      return res.status(200).json({
        success: true,
        message: 'No donations received yet. Waiting for first donation... 🎁',
        data: null
      });
    }

    // Log request (opsional, untuk monitoring)
    console.log('📤 Latest donation requested at:', new Date().toISOString());
    console.log('   Returning:', latestDonation.donatur, '- Rp', latestDonation.jumlah);

    return res.status(200).json({
  success: true,
  message: 'Donations retrieved successfully',
  total: allDonations.length,
  page: page,
  limit: limit,
  data: paginatedDonations
});

  } catch (error) {
    console.error('❌ Error fetching latest donation:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}
