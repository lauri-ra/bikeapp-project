# Bike App

## Solution to Solita dev-academy pre-assignement

## Contents
- [Running the app locally](https://github.com/lauri-ra/bikeapp-project/blob/main/README.md#how-to-run-the-app-locally)
- [E2E testing](https://github.com/lauri-ra/bikeapp-project/blob/main/README.md#e2e-testing)
- [Tech stack](https://github.com/lauri-ra/bikeapp-project/blob/main/README.md#stack)
- [Project structure](https://github.com/lauri-ra/bikeapp-project/blob/main/README.md#project-structure)
- [API](https://github.com/lauri-ra/bikeapp-project/blob/main/README.md#api)
- [What could be improved](https://github.com/lauri-ra/bikeapp-project/blob/main/README.md#what-could-be-improved)

## How to run the app locally

These instructions are tested with Ubuntu 22.04 and Windows 11. Python 3 and Node/npm are also required.

Start by cloning this repository

```
git clone https://github.com/lauri-ra/bikeapp-project.git
```

### Clean & Import the data to database

Move to the **data** directory and import data with the python script in the folder. Instructions are [here](https://github.com/lauri-ra/bikeapp-project/tree/main/data). After the data is imported succesfully, move to the bikeapp directory.

### Running the application

Create a .env file with this variable in the bikapp directory. NOTE: The database URL was sent along with the dev academy application.

```
DATABASE_URL=
```

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

## E2E Testing

First make sure that you are in the bikeapp directory

#### Running tests for production build
Run ```npm run test```. This tests the production build. For changes to take affect, you need to run ```npm run build``` prior.

#### Running tests in development
Run ```npm run dev```. Open another terminal window in the same directory and run ```npm run test:dev```

## Stack

### NextJS
This app is built with NextJS 13.4. I chose this framework, because along with frontend, it supports simple backend functionalities. This means that the app is not as scalable, since there is not a consistent API to query, but the requirements for requests were fairly simple, so I decided to go with this instead of setting up a dedicated backend. I was also interested in learning and working with React Server Components and the new App Router :)
### Prisma
Data is fetched from database using Prisma ORM. Most of queries are fairly simple and Prisma provides full typesafety with TypeScript.

## Project structure
The project is divided in two main directories. Data contains all the stuff that is needed to read and import the data to the database. Bikeapp is the actual application with frontend and backend routes. The application is built with NextJS app router and follows the structure provided in their [documentation](https://nextjs.org/docs/getting-started/project-structure). Here is a short summary if the structure for this project.

#### app -folder
- ```api``` folder contains the API routes that fetch the data from the database. Both journeys and stations have their respective route handlers. The [id] folder inside the stations is the dynamic route for single station data.
- ```components``` folder has client side components
-  ```journeys``` and  ```stations``` contain the page components. As in the api folder, here the nested [id] contains the dynamic page for single station view.
-  ```page.tsx``` main homepage
-  ```layout.tsx``` root or the main layout for the app

#### cypress -folder
Contains everything related to E2E tests. The ```e2e``` folder has all the test files in it.

#### prisma -folder
-  ```connect.ts``` sets up and exports a prisma client that can be used app-wide to access Prisma
-  ```schema.prisma``` main config file for prisma. Contains the generator, datasource and data models. More about this [here](https://www.prisma.io/docs/concepts/components/prisma-schema)


## API
The backend API is implemented with the NextJS API route handlers. This means that it is not a persistent backend, and only runs when the application itself is runnning. These are the routes configured:

#### GET journeys

```
GET /api/journeys/?page={number}
```
Returns an array of 10 journeys and the current page number from the url. The returned journeys are dependent on the page number (for the pagination). For example if we fetch data for page 2, the query skips the first ten items and returns items 11-20. If no page number is configured in the URL, it defaults to 1.

```
{
  journeys: [
    {
      id: 1690397,
      return: "2021-06-01T00:05:46.000Z",
      departure_station_id: 94,
      departure_station_name: "Laajalahden aukio",
      return_station_id: 100,
      return_station_name: "Teljäntie",
      covered_distance_m: 2043,
      duration_s: 500,
      departure: "2021-05-31T23:57:25.000Z"
    },
    {
      id: 1690398,
      return: "2021-06-01T00:07:14.000Z",
      departure_station_id: 82,
      departure_station_name: "Töölöntulli",
      return_station_id: 113,
      return_station_name: "Pasilan asema",
      covered_distance_m: 1870,
      duration_s: 611,
      departure: "2021-05-31T23:56:59.000Z"
    },
    .
    .
    .
  page: 1
 }
```

----

#### GET stations

```
GET /api/stations?page={number}
```
Returns an array of 10 stations and the current page number from the url. The returned stations are dependent on the page number (for the pagination). For example if we fetch data for page 2, the query skips the first ten items and returns items 11-20. If no page number is configured in the URL, it defaults to 1.

```
{
  stations: [
    {
      station_id: 1,
      station_name_fi: "Kaivopuisto",
      station_name_swe: "Brunnsparken",
      address_fi: "Meritori 1",
      address_swe: "Havstorget 1",
      city_fi: " ",
      city_swe: " ",
      capacity: 30,
      lat: "24.9502114714031",
      lon: "60.155369615074"
    },
    {
      station_id: 2,
      station_name_fi: "Laivasillankatu",
      station_name_swe: "Skeppsbrogatan",
      address_fi: "Laivasillankatu 14",
      address_swe: "Skeppsbrogatan 14",
      city_fi: " ",
      city_swe: " ",
      capacity: 12,
      lat: "24.9565097715858",
      lon: "60.1609890692806"
    },
    .
    .
    .
   page: 1
}
```

----

#### GET single station

```
GET /api/stations/{id}
```
Returns an object containing the station that matches the ID in the URL.

```
{
  station_id: 7,
  station_name_fi: "Designmuseo",
  station_name_swe: "Designmuseet",
  address_fi: "Korkeavuorenkatu 23",
  address_swe: "Högbergsgatan 23",
  city_fi: " ",
  city_swe: " ",
  capacity: 14,
  lat: "24.9459599998806",
  lon: "60.16310319166"
}
```

----

#### GET statistics for single station

```
GET /api/stations/id/stats
```
Returns an object containing the statistics for station that matches the ID in the URL.

```
{
  departures: 4106,
  returns: 4105,
  topDepartures: [
    {
      departure_station_id: 21,
      departure_station_name: "Töölönlahdenkatu"
    },
    {
      departure_station_id: 12,
      departure_station_name: "Kanavaranta"
    },
    {
      departure_station_id: 24,
      departure_station_name: "Mannerheimintie"
    },
    {
      departure_station_id: 19,
      departure_station_name: "Rautatientori / itä"
    },
    {
      departure_station_id: 26,
      departure_station_name: "Kamppi (M)"
    }
  ],
  topReturns: [
    {
      return_station_id: 12,
      return_station_name: "Kanavaranta"
    },
    {
      return_station_id: 19,
      return_station_name: "Rautatientori / itä"
    },
    {
      return_station_id: 21,
      return_station_name: "Töölönlahdenkatu"
    },
    {
      return_station_id: 22,
      return_station_name: "Rautatientori / länsi"
    },
    {
      return_station_id: 24,
      return_station_name: "Mannerheimintie"
    }
  ],
  avgDeparture: "2.16",
  avgReturn: "2.17"
}
```

## What could be improved
- Better error handling
- Better user experience: figuring out where server components are needed, where client components might work better
- UI and UX improvements
- Better test coverage
- Separate backend -> better scalability if more complex functionalities are needed

