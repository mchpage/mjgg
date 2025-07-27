require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testQuery() {
  console.log('Supabase URL:', supabaseUrl);
  console.log('API Key length:', supabaseAnonKey ? supabaseAnonKey.length : 'undefined');
  
  const { data, error, count } = await supabase
    .from('horse_prize_money') // horse 테이블 확인
    .select('*', { count: 'exact' }); // count도 함께 조회

  if (error) {
    console.error('Error details:', error);
  } else {
    console.log('Total count:', count);
    console.log('Data length:', data ? data.length : 0);
    console.log('First 3 rows:', data ? data.slice(0, 3) : []);
  }
}

testQuery();
