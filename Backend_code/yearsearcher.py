import requests
import pandas as pd
import mysql.connector
from mysql.connector import errorcode
import folium
#Set the connection 
config = {
  'host':'db-infotoad.mysql.database.azure.com',
  'user':'infotoad38admin',
  'password':'cO52LFKBwNYrmXVJvbdM',
  'database':'dbtoad',
  'client_flags': [mysql.connector.ClientFlag.SSL],
  'ssl_ca': '/Users/pavneetheer/Downloads/DigiCertGlobalRootCA.crt.pem'
}

conn = mysql.connector.connect(**config)
cursor=conn.cursor()


Year= input("Enter the year")


Query= """ SELECT Latitude, Longitude, Year, Suburb 
FROM data where 
Year = %s;
"""
cursor.execute(Query, (Year,))

results = cursor.fetchall()
total_results=len(results)
#Center of the map 
mymap = folium.Map(location=[-25.2744,133.7751], zoom_start=6)

total={}

for result in results:
    #The following is the result
    Latitude, Longitude, Year, Suburb = result
    occurence= f"{Latitude}_{Longitude}_{Year}_{Suburb}"
    # Increase the count of occurrences for the marker
    total[occurence] = total.get(occurence, 0) + 1
    #Pop up text says the year and the poccurences 
    popup_text = f"Suburb: {Suburb} \n Occurrences: {total[occurence]}"
    top_Aus=[-10, 143]
    popup = folium.Popup(popup_text, parse_html=True)
    folium.Marker(location = top_Aus, popup='Count of cane toads in' f"{Year}" 'was' f"{total_results}",icon=folium.Icon(color='red', icon='info-sign')).add_to(mymap)

    #Markers are created based on location and longitude and a pop is created for the particular location
    folium.CircleMarker(location=[Latitude, Longitude],radius=10, color='Red',  fill=True,fill_color="Red",popup=popup).add_to(mymap)

# Save the map to an HTML file
mymap.save("year_map.html")