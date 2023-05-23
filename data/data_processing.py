import numpy as np
import time

def process_journey_data(journey_df, supabase):
    print("Processing journey data...")
    
    # Drop empty cells and duplicate rows
    journey_df = journey_df.dropna()
    journey_df = journey_df.drop_duplicates()
    
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

def process_station_data(stations, supabase):
    print("Processing station data...")
    
    stations = stations.drop(stations.columns[[0,4,9]], axis=1)

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
     
    print("Importing station data...")
    
    # Convert the dataframe to a list of dictionaries. Supabase requires this format.
    station_data = stations.to_dict(orient='records')
    supabase.table('stations').insert(station_data).execute()
