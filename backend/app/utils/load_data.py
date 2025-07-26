# backend/app/utils/load_data.py

import pandas as pd
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models

def load_users(session: Session, csv_path: str):
    df = pd.read_csv(csv_path)
    for _, row in df.iterrows():
        user = models.User(
            id=row['id'],
            name=row['name'],
            email=row['email'],
            # Add other fields as needed
        )
        session.merge(user)  # merge avoids duplicates by primary key

def load_products(session: Session, csv_path: str):
    df = pd.read_csv(csv_path)
    for _, row in df.iterrows():
        product = models.Product(
            id=row['id'],
            name=row['name'],
            description=row['description'],
            price=row['price'],
            # Add other fields as needed
        )
        session.merge(product)

# Repeat for other tables...

def main():
    session = SessionLocal()
    try:
        load_users(session, 'data/users.csv')
        load_products(session, 'data/products.csv')
        # Add calls for orders, order_items, inventory_items, distribution_centers
        session.commit()
        print("Data loaded successfully!")
    except Exception as e:
        session.rollback()
        print("Error:", e)
    finally:
        session.close()

if __name__ == "__main__":
    main()