import pandas as pd
df= pd.read_csv('/Users/pavneetheer/Documents/Team38_Project/API_data.csv')
import math 

import csv 
import pandas as pd
import numpy as np
import math
from geopy.geocoders import Nominatim

# Initialize the geocoder
geolocator = Nominatim(user_agent="geoapiExercises")

# Function to reverse geocode and extract suburb
def get_suburb(lat_lon):
    try:
        location = geolocator.reverse(lat_lon, exactly_one=True)
        address = location.raw['address']
        suburb = address.get('suburb', '')
        return suburb
    except:
        return ''

print("1")
df['Suburb'] = df.apply(lambda row: get_suburb(f"{row['Latitude']}, {row['Longitude']}"), axis=1)
print("2")
# Save the DataFrame to a new CSV file
output_file = "output.csv"
print("3")
df.to_csv(output_file, index=False)