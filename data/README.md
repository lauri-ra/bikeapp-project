## BikeApp

This guide is work in progress

### Initializing the database with Python

Download these .csv files and place them in the data folder.

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
pip install supabase-py
pip install python-dotenv
pip install numpy

```

Run the python program to import the data

```
python import_data.py

```

You can deactivate the virtual environment after the program has run

```
deactivate

```
