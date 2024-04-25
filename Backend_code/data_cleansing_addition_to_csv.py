#This script is used to cleanse and wrangle the raw dataset

# DONT RUN THIS FILE! IT TAKES A LONG TIME, THE OUTPUT IS SAVED IN STATIC 
#Import the libraries
import pandas as pd
import pandas as pd
import mysql.connector
from mysql.connector import errorcode
from sqlalchemy import create_engine
import geopandas as gpd
from shapely.geometry import Point

#Read the data 
df=pd.read_csv('/Users/pavneetheer/Downloads/records24-04-2024/records24-04-2024.csv')
#Provides the information about the data 
df.info()
#Print the column names 
column_names = df.columns.tolist()
print(column_names)
#Only the selected columns are kept 
columns_to_select= ['year', 'month','day', 'stateProvince', 'decimalLatitude', 'decimalLongitude']
df=df[columns_to_select]
#Check for data types of different columns 
print(df.dtypes)
#Check for null values 
null_values = df.isnull().sum()
#Drop columns with null values 
df=df.dropna()
df.info()

df['year'] = df['year'].astype(int)
df['month'] = df['month'].astype(int)
df['day'] = df['day'].astype(int)

new_names = {'year': 'Year', 'month': 'Month', 'day': 'Day', 'decimalLatitude': 'Latitude', 'decimalLongitude': 'Longitude' }
df = df.rename(columns=new_names)



suburbs = gpd.read_file('/Users/pavneetheer/Downloads/SAL_2021_AUST_GDA94_SHP/SAL_2021_AUST_GDA94.shp')
df['Suburb'] = None

for index, row in df.iterrows():
    lat = row["Latitude"]
    lng = row["Longitude"]
    point = Point((lng, lat))
    for _, row in suburbs.iterrows():
        polygon = row['geometry']
        if point.within(polygon):
            df.at[index, "Suburb"] = row['SAL_NAME21']

#Save the df to a csv file so it can be easily accessed later on
df.to_csv("Suburbs_data.csv")
#Reset the index 
df.reset_index(drop=True, inplace=True)
#One column was left to rename, rename State
df = df.rename(columns={'stateProvince': 'State'})

#configuration to connect to the db 
config = {
  'host':'db-infotoad.mysql.database.azure.com',
  'user':'infotoad38admin',
  'password':'cO52LFKBwNYrmXVJvbdM',
  'database':'dbtoad',
  'client_flags': [mysql.connector.ClientFlag.SSL],
  'ssl_ca': '/Users/pavneetheer/Downloads/DigiCertGlobalRootCA.crt.pem'
}

#make the connection 
conn = mysql.connector.connect(**config)
mycursor=conn.cursor()
#Query for creating a table 
query = (
    "CREATE TABLE data ("
    "ID INT AUTO_INCREMENT PRIMARY KEY,"
    "Latitude DOUBLE, "
    "Longitude Double,"
    "State VARCHAR(255), "
    "Suburb VARCHAR(255), "
    "Year INT, "
    "Month INT, "
    "Day INT)"
)

mycursor.execute(query)

#Creating a connection to our db
engine = create_engine("mysql+mysqlconnector://infotoad38admin:cO52LFKBwNYrmXVJvbdM@db-infotoad.mysql.database.azure.com/dbtoad")
df.to_sql('data', con=engine, if_exists='replace', index=False)
