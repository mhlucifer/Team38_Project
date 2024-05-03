import csv
import folium

def suburb_searcher2(suburb):
    with open('static/files/data.csv', 'r') as file:
        reader = csv.reader(file)
        next(reader)  
    
        results = []
        #Change the suburb to title 
        Suburb=suburb.title()
    
        for row in reader:
            if row[9] == Suburb: 
                Latitude, Longitude, Year = float(row[5]), float(row[6]), int(row[1])
                results.append((Latitude, Longitude, Year))

    mymap = folium.Map(location=[-25.2744, 133.7751], zoom_start=2)

    total = {}

    # Go over the results
    for result in results:
        Latitude, Longitude, Year = result
        occurrence = f"{Latitude}_{Longitude}_{Year}"
        # Increase the count of occurrences for the marker
        total[occurrence] = total.get(occurrence, 0) + 1
        # Popup text says the year and the occurrences
        text = f"Year: {Year} \n Occurrences: {total[occurrence]}"
        popup = folium.Popup(text, parse_html=True)
        folium.CircleMarker(location=[Latitude, Longitude], radius=8, color='Orange', fill=True, fill_color="Red",
                            popup=popup).add_to(mymap)

    filename = "suburb_map.html"
    mymap.save('templates/' + filename)
    return filename

# Example usage
# suburb_searcher2('sydney')
