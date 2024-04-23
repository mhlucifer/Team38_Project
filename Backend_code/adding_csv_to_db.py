#this script is used to add the csv data to our database called dbtoad 
#Import the necessary libraries 
import pandas as pd
import requests
import pandas as pd
import mysql.connector
from mysql.connector import errorcode
from sqlalchemy import create_engine


#Read the data file 
df=pd.read_excel('/Users/pavneetheer/Documents/documents/all_uses_data.xlsx')
#Print the number of records that are in the dataset 
print(len(df))
#Count the number of null values 
null_values = df.isnull().sum().sum()

#Get rid of collector-original column as it is not needed. 
df.drop(columns=['Collector - original'], inplace=True)

#Drop the na values 
df=df.dropna()
#check the length of the df now 
print(len(df))
df['LGA'] = df['LGA'].str.split('(').str[0].str.strip()
#Display the first few rows. 
print(df.head)

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
#Query for creating a table 
query = (
    "CREATE TABLE canetoad_data ("
    "ID INT AUTO_INCREMENT PRIMARY KEY, "
    "RecordID VARCHAR(255), "
    "LICENSE VARCHAR(255), "
    "Latitude DOUBLE, " 
    "State VARCHAR(255), "
    "LGA VARCHAR(255), "
    "Year INT, "
    "Month INT, "
    "Day INT)"
)

mycursor.execute(query)

#Creating a connection to our db
engine = create_engine("mysql+mysqlconnector://infotoad38admin:cO52LFKBwNYrmXVJvbdM@db-infotoad.mysql.database.azure.com/dbtoad")
df.to_sql('canetoad_data', con=engine, if_exists='replace', index=False)



