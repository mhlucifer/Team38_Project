import requests
import pandas as pd
import mysql.connector
from mysql.connector import errorcode
import folium

#Set the connection 

def suburb_year_searcher(suburb, Year):
   filename = "final.html"
   Suburb=suburb.title()
   config = {
    'host':'db-infotoad.mysql.database.azure.com',
    'user':'infotoad38admin',
    'password':'tohviv-rixdik-9dircU',
    'database':'dbtoad',
    'client_flags': [mysql.connector.ClientFlag.SSL],
    'ssl_ca': '/Users/pavneetheer/Downloads/DigiCertGlobalRootCA.crt.pem'
    }
   conn = mysql.connector.connect(**config)
   cursor=conn.cursor()
   Query= """ SELECT Latitude, Longitude, Year, Suburb
   FROM data where 
   Suburb = %s & Year = %s ;
   """
   cursor.execute(Query, (Suburb, Year,))
   results = cursor.fetchall()
   if len(results)==0:
          print("No occurences found")
   print(results)
   #Center of the map 
   mymap = folium.Map(location=[-25.2744,133.7751], zoom_start=6)
   #Make a dictionary 
   total={}
   #Go over the results 
   for result in results:
    print(result)
    Latitude, Longitude, Year = result
    occurence= f"{Latitude}_{Longitude}_{Year}_{Suburb}"
    # Increase the count of occurrences for the marker
    total[occurence] = total.get(occurence, 0) + 1
    #Pop up text says the year and the poccurences 
    text = f"Occurrences: {total[occurence]}"
    popup = folium.Popup(text, parse_html=True)
    #Markers are created based on location and longitude and a pop is created for the particular location
    folium.CircleMarker(location=[Latitude, Longitude],radius=8, color='Red',  fill=True,fill_color="Red",popup=popup).add_to(mymap)
    
    mymap.save(filename)
   return filename


suburb_year_searcher('palm island', '2012')


