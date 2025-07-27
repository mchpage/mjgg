import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const DebugSupabase: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      // 1. 연결 테스트
      console.log('Testing Supabase connection...');
      
      // 2. 사용 가능한 테이블 확인 (PostgreSQL 시스템 테이블 조회)
      const { data: tables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
      
      if (tablesError) {
        console.log('Tables query failed, trying direct table access...');
        
        // 3. 직접 테이블 접근 시도
        const possibleTables = [
          'horse_prize_money',
          'jockey_prize_money'
        ];
        
        for (const tableName of possibleTables) {
          try {
            const { data, error } = await supabase
              .from(tableName)
              .select('*')
              .limit(1);
            
            if (!error && data) {
              setResult({
                success: true,
                tableName: tableName,
                columns: Object.keys(data[0] || {}),
                sampleData: data[0],
                message: `Found table: ${tableName}`
              });
              setLoading(false);
              return;
            }
          } catch (e) {
            console.log(`Table ${tableName} not found`);
          }
        }
        
        setResult({
          success: false,
          error: 'No accessible tables found',
          tablesError: tablesError?.message
        });
      } else {
        setResult({
          success: true,
          tables: tables,
          message: 'Successfully retrieved table list'
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    setLoading(false);
  };

  const testSpecificTable = async (tableName: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(5);

      if (error) {
        setResult({
          success: false,
          error: error.message,
          tableName
        });
      } else {
        setResult({
          success: true,
          tableName,
          data,
          columns: data.length > 0 ? Object.keys(data[0]) : [],
          count: data.length
        });
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        tableName
      });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f8ff', margin: '20px', borderRadius: '8px' }}>
      <h3>🔧 Supabase Debug Tool</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testConnection} 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '테스트 중...' : '연결 및 테이블 확인'}
        </button>
        
        <button 
          onClick={() => testSpecificTable('horse_prize_money')} 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          horse_prize_money 테스트
        </button>
        
        <button 
          onClick={() => testSpecificTable('jockey_prize_money')} 
          disabled={loading}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          jockey_prize_money 테스트
        </button>
      </div>
      
      {result && (
        <div style={{ 
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          padding: '15px',
          marginTop: '20px'
        }}>
          <h4>{result.success ? '✅ 성공' : '❌ 오류'}</h4>
          <pre style={{ 
            fontSize: '12px', 
            maxHeight: '400px', 
            overflow: 'auto',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '4px'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugSupabase;
