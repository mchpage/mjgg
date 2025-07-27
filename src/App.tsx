import './App.css';
import HorseRanking from './HorseRanking';
import DebugSupabase from './DebugSupabase';

function App() {
  return (
    <div>
      {/* Supabase 디버그 도구 */}
      <DebugSupabase />
      
      {/* 경마 랭킹 컴포넌트 추가 */}
      <HorseRanking />
    </div>
  );
}

export default App;
