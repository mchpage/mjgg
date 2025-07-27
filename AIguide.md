# Supabase 업로드 후 다음 단계: 마장지지 프로젝트 진행 가이드

## 1. Supabase 설정 마무리 및 API 확인
DB 업로드를 했으니, 데이터가 제대로 저장되었는지 확인하고 API 연동 준비를 하세요. Supabase Studio에서 테이블 구조를 점검하는 게 좋습니다.

## 2. React + TypeScript 프로젝트 생성 및 Supabase 연동
이제 실제 웹사이트를 만들 차례입니다. Vite나 Create React App으로 프로젝트를 시작하고, Supabase 클라이언트를 연결하세요.

- **프로젝트 초기화**:
  - 터미널에서 다음 명령어로 React + TypeScript 앱 생성:
    ```
    npm create vite@latest majang-gg -- --template react-ts
    cd majang-gg
    npm install
    ```
  - Supabase 클라이언트 설치:
    ```
    npm install @supabase/supabase-js
    ```

- **Supabase 클라이언트 파일 생성**:
  - `src/supabaseClient.ts` 파일을 만들어 아래 코드 추가:
    ```typescript
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://your-project.supabase.co'; // Supabase URL
    const supabaseAnonKey = 'your-anon-key'; // Anon Key

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
    ```

- **데이터 조회 테스트**:
  - `src/App.tsx`에 간단한 데이터 불러오기 코드를 넣어 테스트:
    ```typescript
    import { useEffect, useState } from 'react';
    import { supabase } from './supabaseClient';

    function App() {
      const [horses, setHorses] = useState<any[]>([]);

      useEffect(() => {
        async function fetchHorses() {
          const { data, error } = await supabase.from('horses').select('*');
          if (error) console.error(error);
          else setHorses(data);
        }
        fetchHorses();
      }, []);

      return (
        <div>
          <h1>마장지지 테스트</h1>
          <ul>{horses.map(horse => <li key={horse.id}>{horse.name} - 상금: {horse.total_prize}</li>)}</ul>
        </div>
      );
    }

    export default App;
    ```
  - 개발 서버 실행: `npm run dev` 후 브라우저에서 확인. 데이터가 나오면 연동 성공!

이 단계에서 기본적인 데이터 표시를 테스트하며, 페이지 구조(대시보드와 Stats 페이지)를 잡아보세요. React Router를 추가해 두 페이지를 분리하는 것도 좋습니다. (설치: `npm install react-router-dom`)

## 3. UI 개발: 두 페이지 구현
이전 계획대로 Dashboard와 Stats 페이지를 만드세요. poong.today 스타일을 참고해 심플하게.

- **Dashboard 페이지**: 날짜/경기 번호 필터로 Top3 말·기수 + 배당률 표시. (컴포넌트로 테이블 만들기)
- **Stats 페이지**: 누적 상금/승수 랭킹 리스트.

- **스타일링 추가**: 간단히 Tailwind CSS나 styled-components 설치 (`npm install tailwindcss postcss autoprefixer` 등) 후 적용.

개발 중 에러가 나면 Supabase 문서나 Stack Overflow를 참고하세요. 이 단계는 코드 작성량에 따라 1-3일 정도 걸릴 수 있습니다.

## 4. 테스트 및 배포 준비
- **로컬 테스트**: 데이터 필터링, 랭킹 정렬 등이 제대로 동작하는지 확인.
- **빌드 생성**: `npm run build`로 정적 파일 생성. (dist 폴더 확인)
- **환경 변수 관리**: .env 파일에 Supabase 키를 넣고, 빌드 시 무시되지 않도록 설정.

## 5. Vercel에 배포
개발이 끝나면 바로 배포하세요. (이전 답변에서 상세히 설명했으니 간단히 요약)

- GitHub에 프로젝트 푸시.
- Vercel 사이트에서 New Project → GitHub 저장소 선택 → Deploy.
- 환경 변수 추가 (Supabase URL/Key).
- 배포 후 URL로 접속 테스트. (커스텀 도메인 majang.gg 연결 가능)

## 추가 팁
- **데이터 업데이트**: Supabase Edge Functions로 주기적 ETL(데이터 자동 업로드) 스크립트 추가. (Studio에서 Function 생성)
- **문제 발생 시**: Supabase 로그 확인하거나, 무료 플랜 한도(500MB DB 등) 초과 여부 체크.
- **다음 목표**: 배포 후 실제 사용자 피드백 받기, AI 예측 기능 추가.

이 순서대로 하면 MVP가 금방 완성될 거예요. 만약 특정 부분(예: 쿼리 작성)에서 막히면 더 구체적인 코드 예시를 요청해주세요!