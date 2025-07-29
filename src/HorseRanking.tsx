import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

interface HorseRanking {
  hrName: string;
  hrNo: string;
  prize_money: number;
}

const HorseRanking: React.FC = () => {
  const [rankings, setRankings] = useState<HorseRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      
      // horse_prize_money 테이블에서 상금 기준으로 내림차순 정렬하여 상위 10개 가져오기
      const { data, error } = await supabase
        .from('horse_prize_money')
        .select('*') // 모든 컬럼을 조회해서 구조 확인
        .order('prize_money', { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }

      setRankings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 가져오는 중 오류가 발생했습니다.');
      console.error('Error fetching rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrizeMoney = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        오류: {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🏆 경마 상금 랭킹 TOP 10</h2>
      
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                순위
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                말 이름
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                상금
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rankings.map((horse, index) => (
              <tr key={`${horse.hrNo}-${index}`} className={index < 3 ? 'bg-yellow-50 hover:bg-yellow-100' : 'hover:bg-gray-50'}>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center">
                    <span className={`text-lg font-bold ${
                      index === 0 ? 'text-yellow-500' : 
                      index === 1 ? 'text-gray-400' : 
                      index === 2 ? 'text-orange-400' : 'text-gray-600'
                    }`}>
                      {index + 1}
                      {index === 0 && ' 🥇'}
                      {index === 1 && ' 🥈'}
                      {index === 2 && ' 🥉'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {horse.hrName || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className={`text-base font-semibold ${index < 3 ? 'text-gold-light' : 'text-gold-static'}`}>
                    {formatPrizeMoney(horse.prize_money)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {rankings.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          데이터가 없습니다.
        </div>
      )}
    </div>
  );
};

export default HorseRanking;
