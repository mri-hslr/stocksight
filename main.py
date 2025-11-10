"""from fastapi import FastAPI
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
    """
#now integerating database with backend using sqllite3 and fastapi
from fastapi import FastAPI
from pydantic import BaseModel;
import sqlite3 
app=FastAPI()
#1. creating connection with database

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
                quantity Integer Not Null,
                Stock Integer Not Null
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
    
#1.  for inserting data into products table 
    
#define input model 
class Product(BaseModel):
    id:int
    name:str
    category:str
    price:float
    quantity:int
    stock:int
@app.post('/add_products')
def add_products(products:Product):
    conn=connection()
    cursor=conn.cursor()# for execueting multiple sql queries , conn will be able to execuete once , go in detail later 
    cursor.execute('''
                 insert into Products (name,category,price,quantity,stock)
                 Values(?,?,?,?,?)
                   ''',(products.name,products.category,products.price,products.quantity,products.stock))

    conn.commit()
    conn.close()
    return {"message": f"Product '{products.name}' added successfully!"}


#2. for adding data into sales table
class Sales(BaseModel):
    id:int
    product_id:int
    quantity:int
    price:float
    reorder_level:int
    date:str
    
@app.post('/sales')
def sales(sales:Sales):
    conn=connection()
    cursor=conn.cursor()
    cursor.execute('''
                   insert into sales(id,product_id,quantity,price,reorder_level,date)
                   values(?,?,?,?,?)
                   ''',(sales.id,sales.product_id,sales.quantity,sales.price,sales.reorder_level,sales.date))
    conn.commit()
    conn.close()
    return {"message": f"Product '{sales.product_id}' added successfully!"}
    
#3 for adding data into suppliers table
class Suppliers(BaseModel):
    id:int
    name:str
    contact:int
    lead_time_days:int

@app.post('/suppliers')
def suppliers(suppliers:Suppliers):
    conn=connection()
    cursor=conn.cursor()
    cursor.execute('''
                   insert into Suppliers(id,name,contact,lead_time_days)
                   values(?,?,?,?)
                   ''',(suppliers.id,suppliers.name,suppliers.contact,suppliers.lead_time_days))
    conn.commit()
    conn.close()
    return{"message":f"supplier '{suppliers.name}'added successfully"}


#4 for adding data into transactions table
class Transaction(BaseModel):
    id:int
    product_id:int
    sales_id:int
    date:str
    
@app.post('/transactions')
def transactions(trans:Transaction):
    conn=connection()
    cursor=conn.cursor()
    cursor.execute('''
                   insert into Transactions(id,product_id,sales_id,date)
                   values(?,?,?,?)
                   ''',(trans.id,trans.product_id,trans.sales_id,trans.date))
    conn.commit()
    conn.close()
    return {"message":f" transaction'{trans.id}'added successfully"}

# now adding get routes to fetch details from all the tables
@app.get("/products")
def get_all_products():
    conn = connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Products")
    products = cursor.fetchall()
    conn.close()
    return {"products": [dict(p) for p in products]}



@app.get("/sales")
def get_all_products():
    conn = connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Sales")
    sales = cursor.fetchall()
    conn.close()
    return {"Sales": [dict(p) for p in sales]}


@app.get("/suppliers")
def get_all_products():
    conn = connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Suppliers")
    suppliers = cursor.fetchall()
    conn.close()
    return {"suppliers": [dict(p) for p in suppliers]}


@app.get("/transactions")
def get_all_products():
    conn = connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Transactions")
    trans = cursor.fetchall()
    conn.close()
    return {"transactions": [dict(p) for p in trans]}

