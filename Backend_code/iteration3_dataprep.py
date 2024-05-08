#import libraries 

import regex as re
import pandas as pd
#Read the file 
df=pd.read_csv('/Users/pavneetheer/Downloads/records24-04-2024/records24-04-2024.csv')
#This gives us the info about the file 
df.info()
column_names = df.columns.tolist()
#Prints out eh columns 
print(column_names)
#Upon investigation, the columns to be selected are
columns_to_select= ['year', 'month','day', 'stateProvince', 'decimalLatitude', 'decimalLongitude']
df=df[columns_to_select]
#Check for data type
print(df.dtypes)
#Change data types 
df['year'] = df['year'].astype(int)
df['month'] = df['month'].astype(int)
df['day'] = df['day'].astype(int)
#Change the column names to more appropiate names 
new_names = {'year': 'Year', 'month': 'Month', 'day': 'Day', 'decimalLatitude': 'Latitude', 'decimalLongitude': 'Longitude' }
df = df.rename(columns=new_names)

import geopandas as gpd
from shapely.geometry import Point

#Following code adds Suburb into our df
suburbs = gpd.read_file('/Users/pavneetheer/Downloads/SAL_2021_AUST_GDA94_SHP/SAL_2021_AUST_GDA94.shp')
df['Suburb'] = None

n=0
for index, row in df.iterrows():
    lat = row["Latitude"]
    lng = row["Longitude"]
    point = Point((lng, lat))
    for _, row in suburbs.iterrows():
        polygon = row['geometry']
        if point.within(polygon):
            df.at[index, "Suburb"] = row['SAL_NAME21']


 #Index is reset   

df.reset_index(drop=True, inplace=True)