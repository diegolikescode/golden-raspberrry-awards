# GOLDEN RASPBERRRY AWARDS

## HOW TO RUN IT

> This could use a ``Dockerfile`` and ``docker-compose``, but the docs said *"no external instalation required"*. </br>
> Preferably use the NodeJS version defined inside `.nvmrc`, but it'll probably work on more recent versions of NodeJS as well.

- On any Unix-based OS (all commands will install dependencies):
  - `make` runs the app;
  - `make test` runs only the integration tests;
  - `make all` runs both the integration tests and the application afterward;
- Alternatively (or on Windows):
  - `npm i` installs the dependencies;
  - `npm start` runs the app;
  - `npm test` runs the tests;
  - `npm run all` runs both the integration tests and the application afterward;


## TODO: Description

> Based on the .pdf document provided for the task.

### System Requirements

- read a .csv file and insert the data into a database at the start of the application

### API Requirements

- Retrieve the producer with the longest interval between two consecutive awards, and the one who achieved two awards the fastest, following the format specification:

````json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    },
    {
      "producer": "Producer 2",
      "interval": 1,
      "previousWin": 2018,
      "followingWin": 2019
    }
  ],
  "max": [
    {
      "producer": "Producer 1",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    },
    {
      "producer": "Producer 2",
      "interval": 99,
      "previousWin": 2000,
      "followingWin": 2099
    }
  ]
}
````

### System Non-Functional Requirements:

- The RESTful web service should be implemented based on Richardson's Maturity Model Level 2.
- Only integration tests should be implemented. These tests should ensure that the data obtained matches the data provided in the proposal.
- The database should be in-memory, using an embedded DBMS (such as H2). No external installation should be required.
- The application should include a README with instructions on how to run the project and the integration tests.
