import pandas as pd
from supabase import create_client
from dotenv import load_dotenv
import os

from data_processing import process_journey_data, process_station_data

def main():
    # Get variables from .env file
    load_dotenv('.env')
    url = os.getenv('SB_API')
    key = os.getenv('SB_KEY')

    # Connect to the database
    supabase = create_client(url, key)

    # Read the data from CSV files
    print("Reading data from CSV files...")
    data_may = pd.read_csv('2021-05.csv')
    data_june = pd.read_csv('2021-06.csv')
    data_july = pd.read_csv('2021-07.csv')
    stations = pd.read_csv('locationdata.csv')

    # Combine journey CSVs into one dataframe
    journeys = pd.concat([data_may, data_june, data_july])

    # # Process journey data
    process_journey_data(journeys, supabase)

    # # Process and import station data
    process_station_data(stations, supabase)

    print("\nData import complete.")

if __name__ == '__main__':
    main()
