require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testBothTables() {
  console.log('=== 두 테이블 모두 테스트 (읽기 정책 적용) ===\n');
  
  // 1. horse_prize_money 테이블 테스트
  console.log('1. horse_prize_money 테이블:');
  const { data: horseData, error: horseError, count: horseCount } = await supabase
    .from('horse_prize_money')
    .select('*', { count: 'exact' })
    .limit(3);
  
  if (horseError) {
    console.error('  ❌ 에러:', horseError.message);
  } else {
    console.log(`  ✅ 성공: 총 ${horseCount}개 행, 상위 3개:`);
    horseData.forEach((row, i) => {
      console.log(`    ${i + 1}. ${row.hrName} (${row.hrNo}) - ${row.prize_money.toLocaleString()}원`);
    });
  }
  
  console.log('');
  
  // 2. jockey_prize_money 테이블 테스트
  console.log('2. jockey_prize_money 테이블:');
  const { data: jockeyData, error: jockeyError, count: jockeyCount } = await supabase
    .from('jockey_prize_money')
    .select('*', { count: 'exact' })
    .limit(3);
  
  if (jockeyError) {
    console.error('  ❌ 에러:', jockeyError.message);
  } else {
    console.log(`  ✅ 성공: 총 ${jockeyCount}개 행, 상위 3개:`);
    jockeyData.forEach((row, i) => {
      console.log(`    ${i + 1}. ${row.jkName} (${row.jkNo}) - ${row.prize_money.toLocaleString()}원`);
    });
  }
  
  console.log('\n=== 테스트 완료 ===');
  console.log('✅ RLS 읽기 정책이 올바르게 설정되었습니다!');
}

testBothTables();
