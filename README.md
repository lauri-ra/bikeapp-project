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
todo

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
todo

## What could be improved
- Better error handling
- Better user experience: figuring out where server components are needed, where client components might work better
- UI and UX improvements
- Better test coverage
- Separate backend -> better scalability if more complex functionalities are needed

