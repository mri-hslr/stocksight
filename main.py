from fastapi import FastAPI
app=FastAPI()
@app.get('/')
def home():
        return {"message":"welcome to fastAPI"}
@app.get('/products')
def get_products():
    return {"products":["oil","tyres","battery"]}
@app.post('/add_product')
def post_products(name:str):
    return {"products":"product [name] added successfully"}
#using Pydantic model to validate the data, type-conversion and serilize it.
from pydantic import BaseModel;
class Product(BaseModel):
    name:str
    price:float
    quantity:int
@app.post('/add_products')
def add_product(product:Product):
    return{" message": f"{product.name} added costing {product.price} with {product.quantity} quantity"}
    
#now integerating database with backend using sqllite3 and fastapi
#1. creating connection with database
import sqlite3 
def connection():
    conn=sqlite3.connect("products.db")
    conn.row_factory=sqlite3.Row
    return conn
#2. creating table
@app.on_event("startup")
def create_table():
    conn=connection()
    conn.execute('''
            Create Table Products(
                id Integer Primary key,
                name String Not Null,
                category String Not Null,
                Price Integer Not Null,
                Stock Integer Not Null,
                Reorder_level Integer Not Null
            )
        ''')
    conn.execute('''
            Create Table Suppliers(
                id Integer Primary key,
                name String Not Null,
                Contact Integer Not Null,
                lead_time_days Integer Not Null
            )
        ''')
    conn.execute('''
            Create Table Sales(
                id Integer Primary key,
                Foreign key product_id References products(id),
                Quantity Integer Not Null,
                Price Integer Not Null
                Reorder_level Integer Not Null
            )
        ''')

