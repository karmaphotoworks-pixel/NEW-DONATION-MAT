// api/donations.js
// Endpoint untuk melihat semua donasi (untuk testing/monitoring)


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
    // Parse query parameters
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;

    // Validasi parameters
    if (limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 100'
      });
    }

    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page must be greater than 0'
      });
    }

 // Akses global storage
const allDonations = global.donationStorage?.all || [];

// Pagination
const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;
const paginatedDonations = allDonations.slice(startIndex, endIndex);

    console.log('📋 All donations requested at:', new Date().toISOString());
    console.log('   Total:', result.total, '| Page:', page, '| Limit:', limit);

return res.status(200).json({
  success: true,
  message: 'Donations retrieved successfully',
  total: allDonations.length,
  page: page,
  limit: limit,
  data: paginatedDonations
});

  } catch (error) {
    console.error('❌ Error fetching donations:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}
