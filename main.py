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
            Create Table if not exists Products(
                id Integer Primary key AutoIncrement,
                name Text Not Null,
                category Text Not Null,
                Price Real Not Null,
                Stock Integer Not Null,
                Reorder_level Integer Not Null
            )
        ''')
    conn.execute('''
            Create Table if not exists Suppliers(
                id Integer Primary key AutoIncrement,
                name Text Not Null,
                Contact Integer Not Null,
                lead_time_days Integer Not Null
            )
        ''')
    conn.execute('''
            Create Table if not exists Sales(
                id Integer Primary key AutoIncrement,
                product_id Integer Not Null,
                Quantity Integer Not Null,
                Price Real Not Null,
                Reorder_level Integer Not Null,
                Date Text Not Null,
                Foreign key (product_id) References Products(id)
            )
        ''')
    conn.execute('''
            Create Table if not exists Transactions(
                id Integer Primary key AutoIncrement,
                product_id Integer Not Null,
                sales_id Integer Not Null,
                Date Text Not Null,
                Foreign key (product_id) References Products(id),
                Foreign key (sales_id) References Sales(id)
            )
        ''')
    
#creating routes for inserting data into tables
    

