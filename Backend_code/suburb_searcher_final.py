import mysql.connector
import folium

#Set the connection 


def suburb_searcher(suburb):
  Query= """ SELECT Latitude, Longitude, Year
  FROM data where 
  Suburb = %s;
  """

  #Center of the map 
  mymap = folium.Map(location=[-25.2744,133.7751], zoom_start=2)

  #Make a dictionary 
  total={}
  #Go over the results 

  for result in results:

    #The following is the result
    Latitude, Longitude, Year = result
    mymap = folium.Map(location=[Latitude,Longitude], zoom_start=2)
    occurence= f"{Latitude}_{Longitude}_{Year}"
    # Increase the count of occurrences for the marker
    total[occurence] = total.get(occurence, 0) + 1
    #Pop up text says the year and the poccurences 
    text = f"Year: {Year} \n Occurrences: {total[occurence]}"
    popup = folium.Popup(text, parse_html=True)
    #Markers are created based on location and longitude and a pop is created for the particular location
    folium.CircleMarker(location=[Latitude, Longitude],radius=8, color='Orange',  fill=True,fill_color="Red",popup=popup).add_to(mymap)
    filename = "suburb_map.html"
    mymap.save('templates/' + filename)
  return filename


  suburb_searcher('palm island')

