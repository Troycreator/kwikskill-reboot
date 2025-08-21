from sqlalchemy import create_engine, text
from app.database import SQLALCHEMY_DATABASE_URL

def run_migration():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    
    with engine.connect() as conn:
        try:
            # Add columns one at a time
            migrations = [
                "ALTER TABLE services ADD COLUMN category VARCHAR NOT NULL DEFAULT 'Other'",
                "ALTER TABLE services ADD COLUMN skills VARCHAR NOT NULL DEFAULT ''",
                "ALTER TABLE services ADD COLUMN availability VARCHAR"
            ]

            for migration in migrations:
                try:
                    conn.execute(text(migration))
                    print(f"Added column successfully: {migration}")
                except Exception as e:
                    if "duplicate column name" not in str(e).lower():
                        raise e
                    print(f"Column already exists: {migration}")

            conn.commit()
            print("\nMigration completed successfully")

        except Exception as e:
            print(f"\nMigration failed: {str(e)}")
            conn.rollback()

if __name__ == "__main__":
    run_migration()