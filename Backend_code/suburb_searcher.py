import os

import mysql.connector
import folium
import datetime


def suburb_searcher(suburb):
    if not suburb:
        print("Invalid input: No data provided.")
        return None

    Suburb = suburb.title()
    config = {
        'host': '20.163.171.202',
        'user': 'titansadmin',
        'password': 'tp38$2024terra',
        'database': 'toad_data',
    }

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()

    Query = """ SELECT Latitude, Longitude, Year
                FROM canetoad_sightings WHERE 
                combined_location = %s;
            """
    cursor.execute(Query, (Suburb,))
    results = cursor.fetchall()
    total_results = len(results)

    if total_results > 0:
        initial_lat, initial_lon = results[0][0], results[0][1]
        mymap = folium.Map(location=[initial_lat, initial_lon], zoom_start=6)

        total = {}
        for result in results:
            Latitude, Longitude, Year = result
            occurrence = f"{Latitude}_{Longitude}_{Year}"
            total[occurrence] = total.get(occurrence, 0) + 1
            text = f"Year: {Year} \n Occurrences: {total[occurrence]}"
            popup = folium.Popup(text, parse_html=True)
            folium.CircleMarker(location=[Latitude, Longitude], radius=8, color='Orange', fill=True, fill_color="Red",
                                popup=popup).add_to(mymap)
    else:
        mymap = folium.Map(location=[-25.2744, 133.7751], zoom_start=4)
        html = '<div style="font-family: \'Open Sans\', sans-serif; font-size: 50px; color: white; background-color: rgba(0,0,0,0.5); padding: 10px;">No cane toad sightings reported</div>'
        marker = folium.Marker(
            location=[-25.2744, 133.7751],
            icon=folium.DivIcon(
                icon_size=(500, 500),
                icon_anchor=(0, 0),
                html=html
            )
        )
        marker.add_to(mymap)

    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"suburb_map_{timestamp}.html"
    file_path = os.path.join('templates', filename)

    # Save the map
    mymap.save(file_path)

    return filename