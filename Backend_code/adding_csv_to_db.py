import pandas as pd
import requests
import pandas as pd
import mysql.connector
from mysql.connector import errorcode

import pandas as pd
from sqlalchemy import create_engine
df=pd.read_csv('/Users/pavneetheer/Desktop/FIT5120/canetoad_data_updated.csv')
df = df.dropna()
print(len(df))
print(df.head())

#Make a connection to the database 
config = {
  'host':'db-infotoad.mysql.database.azure.com',
  'user':'infotoad38admin',
  'password':'cO52LFKBwNYrmXVJvbdM',
  'database':'dbtoad',
  'client_flags': [mysql.connector.ClientFlag.SSL],
  'ssl_ca': '/Users/pavneetheer/Downloads/DigiCertGlobalRootCA.crt.pem'
}

conn = mysql.connector.connect(**config)

mycursor=conn.cursor()


c_d = ", ".join([f"{col} VARCHAR(255)" for col in df.columns])


create_table_query = f"CREATE TABLE canetoad_data (ID INT AUTO_INCREMENT PRIMARY KEY, {c_d})"

mycursor.execute(create_table_query)

engine = create_engine("mysql+mysqlconnector://infotoad38admin:cO52LFKBwNYrmXVJvbdM@db-infotoad.mysql.database.azure.com/dbtoad")
df.to_sql('canetoad_data', con=engine, if_exists='replace', index=False)



