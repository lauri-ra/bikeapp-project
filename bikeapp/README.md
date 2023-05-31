# Bike App

##### Solution to Solita dev-academy pre-assignement

---

#### How to run the app locally

These instructions are tested with Ubuntu 22.04 and Windows 11. Python 3 and Node/npm are also required.

Start by cloning this repository

```
git clone https://github.com/lauri-ra/bikeapp-project.git
```

##### Clean & Import the data to database

Move to the **data** directory and import data with the python script in the folder. Instructions are [here](https://github.com/lauri-ra/bikeapp-project/tree/main/data). After the data is imported succesfully, move to the bikeapp directory.

##### Running the application

In the bikeapp directory start by installing required dependencies

```
npm install
```

Then create a production build with

```
npm build
```

Finally start the application

```
npm start
```

The application will start locally at [http://localhost:3000](http://localhost:3000)
