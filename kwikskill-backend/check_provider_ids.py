import sqlite3

db_path = "kwikskill.db"  # adjust path if needed

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT id, provider_id FROM services;")
rows = cursor.fetchall()

for row in rows:
    print(f"Service ID: {row[0]}, Provider ID: {row[1]}")

conn.close()
