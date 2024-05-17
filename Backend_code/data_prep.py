#DO NOT RUN THIS FILE 
#OUTPUT HAS BEEN SAVED IN STATIC 
#import libraries 
import regex as re
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point

#Read the file 
df=pd.read_csv('static/files/records24-04-2024.csv')

#This gives us the info about the file 
df.info()

#This prints out the column names 
column_names = df.columns.tolist()
#Prints out each of the column names
print(column_names)

#Upon investigation, the columns to be selected are
columns_to_select= ['year', 'month','day', 'stateProvince', 'decimalLatitude', 'decimalLongitude']
#This selects the columns that are to be used 
df=df[columns_to_select]

#Check for data type
print(df.dtypes)

#Change data types 
df['year'] = df['year'].astype(int)
df['month'] = df['month'].astype(int)
df['day'] = df['day'].astype(int)

#Change the column names to more appropiate names 
new_names = {'year': 'Year', 'month': 'Month', 'day': 'Day', 'decimalLatitude': 'Latitude', 'decimalLongitude': 'Longitude','stateProvince': 'State'  }

#Rename the names 
df = df.rename(columns=new_names)

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

#Load the postcode shapefile
df2 = gpd.read_file('/Users/pavneetheer/Downloads/POA_2021_AUST_GDA2020_SHP/POA_2021_AUST_GDA2020.shp')
df['postcode']=None

for index, row in df.iterrows():
    lat = row["Latitude"]
    lng = row["Longitude"]
    point = Point((lng, lat))
    for _, row in df2.iterrows():
        polygon = row['geometry']
        if point.within(polygon):
            df.at[index, "postcode"] = row['POA_CODE21']

#Check if the df has any null values 
df.isna().sum()

#Df is saved with no null values 
df=df.dropna()

#Adding the state code 
state_abbreviations = {
    'Queensland': 'QLD',
    'New South Wales': 'NSW',
    'Victoria': 'VIC',
    'Western Australia': 'WA',
    'South Australia': 'SA'
}

df['state_code'] = df['State'].apply(lambda x: state_abbreviations.get(x, x))

#Remove extra characters from suburb column 
def remove_parentheses(text):
    text = re.sub(r'\([^)]*\)', '', text) 
    text = text.strip()  
    return text

# Apply the function to the 'Location' column
df['Suburb'] = df['Suburb'].apply(remove_parentheses)

df['postcode']=df['postcode'].astype(str)


df['combined_location'] = df['Suburb'] + ', ' + df['postcode'] + ', ' + df['state_code']


#This dataframe is saved as data.csv 

df.to_csv("data.csv")

