import os
import datetime

import mysql.connector
import folium

#searches based on year 
def year_searcher(Year):
    config = {
        'host': '20.163.171.202',
        'user': 'titansadmin',
        'password': 'tp38$2024terra',  
        'database': 'toad_data',
    }
    
    #make the connection 
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    #SQL connection 
    query = """SELECT Latitude, Longitude, Year, Suburb
               FROM canetoad_sightings
               WHERE Year = %s;"""
    cursor.execute(query, (Year,))
    #This looks up all the results 
    results = cursor.fetchall()
    total_results = len(results)

    # Center of the map 
    mymap = folium.Map(location=[-25.2744, 133.7751], zoom_start=4)
    #this checks for total_results , if they are more than 0

    if total_results > 0:
        total = {}
        #iterates over all ther results 
        for result in results:
            # The following is the result
            Latitude, Longitude, Year, Suburb = result
            # Save the occurrence into a variable
            occurrence = f"{Latitude}_{Longitude}_{Year}_{Suburb}"
            # Increase the count of occurrences when each is found
            total[occurrence] = total.get(occurrence, 0) + 1
            # Pop up text says the year and the occurrences 
            popup_text = f"Suburb: {Suburb} \n Year: {Year} \n Occurrences: {total[occurrence]}"
            popup = folium.Popup(popup_text, parse_html=True)
            # Markers are created based on location and longitude and a popup is created for the particular location
            folium.CircleMarker(location=[Latitude, Longitude], radius=10, color='Orange', fill=True, fill_color="Red", popup=popup).add_to(mymap)
    else:
        html = html = '<div style="font-family: \'Open Sans\', sans-serif; font-size: 50px; color: white; background-color: rgba(0,0,0,0.5); padding: 10px;">No cane toad sightings reported in this year</div>'
        marker = folium.Marker(
        location=[-25.2744, 133.7751],
        icon=folium.DivIcon(
        icon_size=(500,500),
        icon_anchor=(0,0),
        html=html
    ))
        marker.add_to(mymap)
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"year_map_{timestamp}.html"
    file_path = os.path.join('templates', filename)

    # Save the map
    mymap.save(file_path)



    return filename
