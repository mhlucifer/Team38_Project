import mysql.connector
import folium
#Set the connection 
def year_searcher(Year):
  cursor=db_connection.cursor()

  Query= """ SELECT Latitude, Longitude, Year
  FROM canetoad_sightings where 
  Year = %s;
  """
  cursor.execute(Query, (Year,))

  results = cursor.fetchall()
  total_results=len(results)
  #Center of the map 
  mymap = folium.Map(location=[-25.2744,133.7751], zoom_start=4)

  total={}

  for result in results:
    #The following is the result
    Latitude, Longitude, Year, Suburb = result
    #Save the occurence into a variable
    occurence= f"{Latitude}_{Longitude}_{Year}_{Suburb}"
    # Increase the count of occurrences when each is found
    total[occurence] = total.get(occurence, 0) + 1
    #Pop up text says the year and the poccurences 
    popup_text = f"Suburb: {Suburb} \n Occurrences: {total[occurence]}"
    top_Aus=[-10, 143]
    popup = folium.Popup(popup_text, parse_html=True)
    folium.Marker(location = top_Aus, popup='Count of cane toads in' f"{Year}" 'was'  f"{total_results}",icon=folium.Icon(color='red', icon='info-sign')).add_to(mymap)

    #Markers are created based on location and longitude and a pop is created for the particular location
    folium.CircleMarker(location=[Latitude, Longitude],radius=10, color='Orange',  fill=True,fill_color="Red",popup=popup).add_to(mymap)
    filename = "year_map.html"
    mymap.save('templates/' + filename)

    # Return the filename
  return filename

#year_searcher(2023)