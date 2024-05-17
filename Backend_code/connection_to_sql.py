import pandas as pd
from sqlalchemy import create_engine 
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text

#Creating the connection 
engine=create_engine('mysql+pymysql://titansadmin:tp38$2024terra@20.163.171.202:3306/toad_data')

#select the file needed
csv_file='static/files/data.csv'

df=pd.read_csv(csv_file)

table_name='canetoad_sightings'

df.to_sql(name=table_name, con=engine, index=False, if_exists='replace')
