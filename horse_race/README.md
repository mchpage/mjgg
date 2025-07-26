# Horse Race Data Analysis

## 프로젝트 구조

```
horse_race/
├── data/
│   ├── raw/                    # 원본 데이터
│   │   └── race_results_2025.db
│   └── processed/              # 가공된 데이터
│       ├── race_results_2025_race_results.csv
│       ├── horse_prize_money_sum.csv
│       └── jockey_prize_money_sum.csv
├── notebooks/                  # Jupyter 노트북
│   ├── data.ipynb
│   └── new_data.ipynb
├── scripts/                    # Python 스크립트
│   └── convert_to_csv.py
├── docs/                       # 문서
│   └── project.md
└── venv/                       # 가상환경
```

## 설치 및 실행

1. 가상환경 활성화:
   ```bash
   source venv/bin/activate
   ```

2. 필요한 패키지 설치:
   ```bash
   pip install pandas
   ```

3. 데이터베이스를 CSV로 변환:
   ```bash
   cd scripts
   python convert_to_csv.py
   ```

## 데이터

- **원본 데이터**: `data/raw/race_results_2025.db` - SQLite 데이터베이스 파일
- **가공된 데이터**: `data/processed/` - CSV 형태로 변환된 데이터

## 분석

Jupyter 노트북을 사용한 데이터 분석은 `notebooks/` 폴더에서 진행합니다.
