import pandas as pd
import numpy as np
from supabase import create_client
from dotenv import load_dotenv
import os
import time

# Get variables from .env file
load_dotenv('../.env')
url = os.getenv('SB_API')
key = os.getenv('SB_KEY')

# Connect to the database
supabase = create_client(url, key)

print("Reading data from CSV files...")

# Read the data from CSV files
data_may = pd.read_csv('2021-05.csv')
data_june = pd.read_csv('2021-06.csv')
data_july = pd.read_csv('2021-07.csv')
stations = pd.read_csv('locationdata.csv')

# Combine journey CSVs into one dataframe
journey_df = pd.concat([data_may, data_june, data_july])

print("Processing data...")

# Drop empty cells and duplicate rows
journey_df = journey_df.dropna()
journey_df = journey_df.drop_duplicates()

# Remove the the columns that are not needed
stations = stations.drop(stations.columns[[0,4,9]], axis=1)

# Rename columns to match those in the database
journey_df.columns = [
    'departure',
    'return',
    'departure_station_id',
    'departure_station_name',
    'return_station_id',
    'return_station_name',
    'covered_distance_m',
    'duration_s'
]

stations.columns = [
    'station_id',
    'station_name_fi',
    'station_name_swe',
    'address_fi',
    'address_swe',
    'city_fi',
    'city_swe',
    'capacity',
    'lat',
    'lon'
]

# Drop cells with journeys that lasted less than 10s
journey_df = journey_df[journey_df['duration_s'] > 10]

# Drop cells with journeys that had a distance shorter than 10m
journey_df = journey_df[journey_df['covered_distance_m'] > 10]

# Batch size
batch_size = 10000

# Split the dataframe into smaller chunks
chunks = np.array_split(journey_df, len(journey_df) // batch_size)

# Process and push each chunk
print("Importing journey data in chunks...")
total_chunks = len(chunks)
for i, chunk in enumerate(chunks, 1):
    try:
        # Convert the chunk to a list of dictionaries. Supabase requires this format.
        chunk_data = chunk.to_dict(orient='records')
        
        # Push the chunk to the database
        supabase.table('journeys').insert(chunk_data).execute()
        
        # Print progress on the same line
        print(f"Processing chunk {i}/{total_chunks}", end="\r", flush=True)
        
    except Exception as e:
        # Handle the error
        print("Error occurred:", str(e))
        
        # Wait for some time before retrying
        print("Retrying...")
        time.sleep(1)
        
        # Retry the failed request
        supabase.table('journeys').insert(chunk_data).execute()

print("Importing station data...")
# Convert the dataframe to a list of dictionaries. Supabase requires this format.
station_data = stations.to_dict(orient='records')
supabase.table('stations').insert(station_data).execute()

print("\nData import complete.")