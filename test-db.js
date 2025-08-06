const db = require('./db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ DB Connected! Result:', rows[0].result);
  } catch (err) {
    console.error('❌ DB Connection Failed:', err.message);
  }
}

testConnection();
