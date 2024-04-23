#Import necessary libraries 

import pandas as pd
import json
import folium 

df = pd.read_excel("static/files/all_uses_data.xlsx")
state_counts = df.groupby('State').size()
state_counts_df = state_counts.reset_index(name='Count')
state_counts_df = state_counts.reset_index()
state_counts_df.columns = ['State', 'Count']

center=folium.Map(location=[25.2744,133.7751], zoom_start=2)
geo_file= 'static/files/states.geojson'

folium.Choropleth(
    geo_data=geo_file, 
    data=state_counts_df,
    columns=['State', 'Count'],
    key_on='feature.properties.STATE_NAME',
    fill_color='Reds',
    legend_name='Cane toad distribution by State',
    highlight=True

).add_to(center)

# Save map
center.save("map.html")