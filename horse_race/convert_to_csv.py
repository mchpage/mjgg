import sqlite3
import pandas as pd

def convert_db_to_csv(db_path, csv_path):
    # SQLite 데이터베이스 연결
    conn = sqlite3.connect(db_path)

    # 데이터베이스의 모든 테이블 이름 가져오기
    query = "SELECT name FROM sqlite_master WHERE type='table';"
    tables = pd.read_sql(query, conn)

    for table_name in tables['name']:
        # 각 테이블의 데이터를 DataFrame으로 읽기
        df = pd.read_sql(f"SELECT * FROM {table_name}", conn)

        # 테이블 이름을 기준으로 CSV 파일 저장
        table_csv_path = f"{csv_path.rstrip('.csv')}_{table_name}.csv"
        df.to_csv(table_csv_path, index=False)
        print(f"Table '{table_name}' has been written to {table_csv_path}")

    # 연결 닫기
    conn.close()

if __name__ == "__main__":
    db_path = "race_results_2025.db"  # 데이터베이스 파일 경로
    csv_path = "race_results_2025.csv"  # 저장할 CSV 파일 경로

    convert_db_to_csv(db_path, csv_path)
