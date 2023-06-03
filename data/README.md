## BikeApp

This guide is for importing data to the Supabase database that the bikeapp requires to fucntion.

### Initializing the database with Python

Download these .csv files and place them in the data folder.

- https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
- https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
- https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv

Create a .env file in the data folder with these variables. NOTE: The API address and key are sent along with the dev academy application.

```
SB_API=
SB_KEY=
```

Create a virtual environment

```
python3 -m venv bikevenv
```

Activate the virtual environment

```
source bikevenv/bin/activate
```

Install the required libraries for Python

```
pip install pandas
pip install supabase
pip install python-dotenv
pip install numpy
```

Run the python program to import the data

```
python main.py
```

You can deactivate the virtual environment after the program has run

```
deactivate
```
