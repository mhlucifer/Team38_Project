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
    #Load the Geojson file 
    geo_data=file1, 
    #Data to be used is the count data from the state_counts_df 
    data=state_counts_df,
    #This chooses the STAte to be associated with the features property and the count is what the map should be made with
    columns=['State', 'Count'],
    #What to use as the key to match with State from above
    key_on='feature.properties.STATE_NAME',
    #Naming the map
    legend_name='Cane toad distribution by State',
    #Colours to choose 
    fill_color='Reds',
    #Highlight when hovering over 
    highlight=True

).add_to(map_center)

# Save map
map_center.save("map.html")