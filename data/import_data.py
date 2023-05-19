import pandas as pd
from supabase import create_client
from dotenv import load_dotenv
import os

# Get variables from .env file
load_dotenv('../.env')
url = os.getenv('SB_API')
key = os.getenv('SB_KEY')

# Connect to the database
supabase = create_client(url, key)

# Read the data from CSV files
data_may = pd.read_csv('2021-05.csv')
data_june = pd.read_csv('2021-06.csv')
data_july = pd.read_csv('2021-07.csv')

# Combine CSVs into one dataframe
df = pd.concat([data_may, data_june, data_july])

# Drop empty cells and duplicate rows
df = df.dropna()
df = df.drop_duplicates()

# Rename columns to match those in the database
df.columns = [
    'departure',
    'return',
    'departure_station_id',
    'departure_station_name',
    'return_station_id',
    'return_station_name',
    'covered_distance_m',
    'duration_s'
]

# Drop cells with journeys that lasted less than 10s
df = df[df['duration_s'] > 10]

# Drop cells with journeys that had a distance shorter than 10m
df = df[df['covered_distance_m'] > 10]

# Turn the dataframe into a list of dictionaries
#data = df.to_dict(orient='records')

# Sample data for testing purposes
testdf = df.head(35)
testdata = testdf.to_dict(orient='records')

# Push the dict to the database
result = supabase.table('journeys').insert(testdata).execute()

# Check the result
print(result)