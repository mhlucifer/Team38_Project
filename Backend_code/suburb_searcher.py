
import mysql.connector
import folium
import datetime
def suburb_searcher(suburb):
  #Change the suburb
  Suburb=suburb.title()
  config = {
  'host':'20.163.171.202',
  'user':'titansadmin',
  'password':'tp38$2024terra',
  'database':'toad_data',

  }
  conn = mysql.connector.connect(**config)

  cursor=conn.cursor()
  #run the query
  Query= """ SELECT Latitude, Longitude, Year
  FROM canetoad_sightings where 
  combined_location = %s;
  """
  cursor.execute(Query, (Suburb,))
  results = cursor.fetchall()

  initial_lat, initial_lon = results[0][0], results[0][1]
  mymap = folium.Map(location=[initial_lat, initial_lon], zoom_start=6)
  #Make a dictionary 
  total={}
  #Go over the results 

  for result in results:
    #The following is the result
    Latitude, Longitude, Year = result
    occurence= f"{Latitude}_{Longitude}_{Year}"
    # Increase the count of occurrences for the marker
    total[occurence] = total.get(occurence, 0) + 1
    #Pop up text says the year and the poccurences 
    text = f"Year: {Year} \n Occurrences: {total[occurence]}"
    popup = folium.Popup(text, parse_html=True)
    #Markers are created based on location and longitude and a pop is created for the particular location
    folium.CircleMarker(location=[Latitude, Longitude],radius=8, color='Orange',  fill=True,fill_color="Red",popup=popup).add_to(mymap)
  #save the filename
  timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
  filename = f"suburb_map_{timestamp}.html"
  mymap.save('templates/' + filename)
  return filename
