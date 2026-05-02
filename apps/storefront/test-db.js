const { Client } = require('pg');

const client = new Client({
  host: 'aws-1-eu-central-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.vbfotyehupdejvjdkqie',
  password: 'Griha22rus1!',
  database: 'postgres',
  ssl: false // Временно отключаем для теста
});

async function test() {
  try {
    console.log('Connecting to Pooler (No SSL)...');
    await client.connect();
    console.log('Connected successfully!');
    const res = await client.query('SELECT NOW()');
    console.log('Current time:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
}

test();
