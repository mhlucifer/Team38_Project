import requests
import pandas as pd
#Firstly the data was examined 

response = requests.get('https://api.ala.org.au/occurrences/occurrences/search?q=taxa%3A%22cane%20toad%22&qualityProfile=re-usable&qc=-_nest_parent_%3A*&limit=100')
data=response.json()

# get the keys
print(data.keys())


#Gives the number of records in the API
total_records=data.get('totalRecords')
# print("Total number of records are :" total_records)


#Initially, the limit was found to be 10
limit=10
#this is the number of pages that is needed
no_of_pages= (total_records+limit-1)//limit

# #Initialise lists 
RecordID=[]
State=[]
Year=[]
Month=[]
Latitude=[]
Longitude=[]
response = requests.get('https://api.ala.org.au/occurrences/occurrences/search?q=taxa%3A%22cane%20toad%22&qualityProfile=re-usable&qc=-_nest_parent_%3A*&limit=100')
data = response.json()
results = data.get('occurrences', [])
for result in results:
    RecordID.append(result.get('uuid', None))
    State.append(result.get('stateProvince', None))
    Year.append(result.get('year', None))
    Month.append(result.get('month', None))
    Latitude.append(result.get('decimalLatitude', None))
    Longitude.append(result.get('decimalLongitude', None))


df= pd.DataFrame ({'RecordID':RecordID,'State': State, 'Year': Year,'Month':Month, 'Latitude': Latitude,'Longitude': Longitude  })

print(df)
null_values = df.isnull().sum()

# Print the result
print("Null values in each column:")
print(null_values)

df = df.dropna()


import mysql.connector
from mysql.connector import errorcode


config = {
  'host':'db-infotoad.mysql.database.azure.com',
  'user':'infotoad38admin',
  'password':'cO52LFKBwNYrmXVJvbdM',
  'database':'dbtoad',
  'client_flags': [mysql.connector.ClientFlag.SSL],
  'ssl_ca': '/Users/pavneetheer/Downloads/DigiCertGlobalRootCA.crt.pem'
}

conn = mysql.connector.connect(**config)
cursor=conn.cursor()
cursor.execute("Create database if not exists new_db")
conn.commit()


hostname= "db-infotoad.mysql.database.azure.com"
database= "new_db"
username= "infotoad38admin"
password= "cO52LFKBwNYrmXVJvbdM"
import pandas as pd 
from sqlalchemy import create_engine
import mysql.connector


engine = create_engine("mysql+pymysql://{user}:{pw}@{host}/{db}".format(host=hostname, db=database, user=username, pw=password))
df.to_sql('canetoad_data', engine, if_exists='replace', index=False)

cursor.close()
conn.close()
