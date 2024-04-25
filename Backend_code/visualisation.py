#Import necessary libraries 

import pandas as pd
import plotly.express as px
import json

def generate_map():
    df = pd.read_csv("static/files/canetoad_data.csv")
    state_counts = df.groupby('State_parsed').size()
    state_counts_df = state_counts.reset_index(name='Count')
    state_counts_df = state_counts.reset_index()
    state_counts_df.columns = ['State', 'Count']

    geojson_path = 'static/files/states.geojson'
    with open(geojson_path, 'r') as file:
        australia_states_geojson = json.load(file)

    fig = px.choropleth(state_counts_df,
                        geojson=australia_states_geojson,
                        locations='State',
                        featureidkey="properties.STATE_NAME",
                        color='Count',
                        color_continuous_scale="reds",
                        )

    fig.update_geos(fitbounds="locations")
    graphJSON = fig.show()
    return graphJSON

map=generate_map()
print(map)