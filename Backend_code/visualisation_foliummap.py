#Import necessary libraries 

import pandas as pd
import folium 

#Read the csv file 
df = pd.read_csv("static/files/Suburbs_data.csv")
#count the number of occurences by state 
state_counts = df.groupby('State').size()
#Put the counts in a df 
state_counts_df = state_counts.reset_index(name='Count')
state_counts_df.columns = ['State', 'Count']

#This centers the map 
map_center=folium.Map(location=[-25.2744,133.7751], zoom_start=5)
#loading the geojson file 
file1= 'static/files/states.geojson'

#Generating the map using folium 
folium.Choropleth(
    geo_data=file1, 
    data=state_counts_df,
    columns=['State', 'Count'],
    key_on='feature.properties.STATE_NAME',
    legend_name='Cane toad distribution by State',
    fill_color='Reds',
    highlight=True

).add_to(map_center)

# Save map
map_center.save("map.html")