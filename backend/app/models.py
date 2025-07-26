# backend/app/models.py

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class DistributionCenter(Base):
    __tablename__ = "distribution_centers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)

    products = relationship("Product", back_populates="distribution_center")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    cost = Column(Float)
    category = Column(String)
    name = Column(String)
    brand = Column(String)
    retail_price = Column(Float)
    department = Column(String)
    sku = Column(String)
    distribution_center_id = Column(Integer, ForeignKey("distribution_centers.id"))

    distribution_center = relationship("DistributionCenter", back_populates="products")
    inventory_items = relationship("InventoryItem", back_populates="product")

class InventoryItem(Base):
    __tablename__ = "inventory_items"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    created_at = Column(DateTime)
    sold_at = Column(DateTime)
    cost = Column(Float)
    product_category = Column(String)
    product_name = Column(String)
    product_brand = Column(String)
    product_retail_price = Column(Float)
    product_department = Column(String)
    product_sku = Column(String)
    product_distribution_center_id = Column(Integer, ForeignKey("distribution_centers.id"))

    product = relationship("Product", back_populates="inventory_items")
    distribution_center = relationship("DistributionCenter")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    age = Column(Integer)
    gender = Column(String)
    state = Column(String)
    street_address = Column(String)
    postal_code = Column(String)
    city = Column(String)
    country = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    traffic_source = Column(String)
    created_at = Column(DateTime)

    orders = relationship("Order", back_populates="user")

class Order(Base):
    __tablename__ = "orders"
    order_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String)
    gender = Column(String)
    created_at = Column(DateTime)
    returned_at = Column(DateTime)
    shipped_at = Column(DateTime)
    delivered_at = Column(DateTime)
    num_of_item = Column(Integer)

    user = relationship("User", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.order_id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    inventory_item_id = Column(Integer, ForeignKey("inventory_items.id"))
    status = Column(String)
    created_at = Column(DateTime)
    shipped_at = Column(DateTime)
    delivered_at = Column(DateTime)
    returned_at = Column(DateTime)

    order = relationship("Order", back_populates="order_items")
    user = relationship("User")
    product = relationship("Product")
    inventory_item = relationship("InventoryItem")