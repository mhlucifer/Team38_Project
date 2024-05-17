import pandas as pd
import plotly.express as px
import json
import os

def generate_map2():
    try:
        # 读取数据文件
        df = pd.read_csv("../static/files/data.csv")
        state_counts = df.groupby('State').size()
        state_counts_df = state_counts.reset_index(name='Count')
        state_counts_df.columns = ['State', 'Count']

        # 读取GeoJSON文件
        geojson_path = '../static/files/states.geojson'
        with open(geojson_path, 'r') as file:
            australia_states_geojson = json.load(file)

        # 创建Plotly图表，设置宽度和高度
        fig = px.choropleth(state_counts_df,
                            geojson=australia_states_geojson,
                            locations='State',
                            featureidkey="properties.STATE_NAME",
                            color='Count',
                            color_continuous_scale="reds",
                            width=500,
                            height=400
                            )

        fig.update_geos(fitbounds="locations")

        # 保存图表为HTML文件
        current_dir = os.path.dirname(__file__)
        output_path = os.path.join(current_dir, '..', 'templates', 'handling_header.html')
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        fig.write_html(output_path, include_plotlyjs='cdn')

        print(f"Map saved to: {os.path.abspath(output_path)}")
        return output_path
    except Exception as e:
        print(f"Error generating map: {e}")
        return None

map_path = generate_map2()
