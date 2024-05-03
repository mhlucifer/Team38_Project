import pandas as pd
df=pd.read_csv('static/files/Suburbs_data.csv')

suburb_list = df['Suburb'].unique().tolist()

with open('suburbs.txt', 'w') as file:
    for suburb in suburb_list:
        if isinstance(suburb, str):  # Check if suburb is a string
            file.write(suburb + '\n')

