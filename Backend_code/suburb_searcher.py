import mysql.connector
import folium
import datetime

def suburb_searcher(suburb):
    if not suburb:  
        print("Invalid input: No data provided.")
        return None
    # Change the suburb
    Suburb = suburb.title()
    config = {
        'host': '20.163.171.202',
        'user': 'titansadmin',
        'password': 'tp38$2024terra',
        'database': 'toad_data',
    }
    # Make the connection
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    # Run the query
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
            # Increase the count of occurrences for the marker
            total[occurrence] = total.get(occurrence, 0) + 1
            # Popup text says the year and the occurrences
            text = f"Year: {Year} \n Occurrences: {total[occurrence]}"
            popup = folium.Popup(text, parse_html=True)
            # Markers are created based on location and longitude and a popup is created for the particular location
            folium.CircleMarker(location=[Latitude, Longitude], radius=8, color='Orange', fill=True, fill_color="Red", popup=popup).add_to(mymap)
    else:
        mymap = folium.Map(location=[-25.2744, 133.7751], zoom_start=6)  # Center map on Australia
        html = '<div style="font-size: 30 pt; color: black">No cane toad sightings reported</div>'
        marker = folium.Marker(
            location=[-25.2744, 133.7751],
            icon=folium.DivIcon(
                icon_size=(300, 200),
                icon_anchor=(0, 0),
                html=html
            )
        )
        marker.add_to(mymap)

    # Save the filename
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"suburb_map_{timestamp}.html"
    mymap.save('templates/' + filename)
    return filename
