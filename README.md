# beeHero

## Weather Rest API

REST API for a 5 day weather forecast of 5 cities: Jerusalem, Haifa, Tel Aviv,
Eilat, Tiberias. Data is downloaded from https://openweathermap.org/api, and stored in a PostgreSQL DB locally.

_**Note**: the free API only allows for hourly forecasts up to 3 days_

## API

-   **GET /api/cities** - return a collection of cities and their 5 days weather forecast. You can use a 'sort' query param to sort the collection, e.g. GET /api/cities?sort={by: feels-like}
-   **GET /api/avarages** - return a collection of cities and their avarage temp per day
-   **GET /api/humidityPoints** - return a collection of humidity forecasts. You can use a 'sort' query param to sort the collection, e.g. GET /api/humidityPoints?sort={by: value, order: desc}. You can use a 'limit' query param to limit the number of collection items returned, e.g. GET /api/humidityPoints?limit=1

## Implementation

API is developed using https://nestjs.com/ (typescript/node.js)

### Installation

1. Clone the repository
2. Install with 'npm i'
3. Run with 'npm run start'

### Setup

1. The Web server will listen with HTTP on the port defined in beeHero/src/main.ts (3000 by default)
2. Set connection details in beeHero/src/app.module.ts by changing the TypeORM binding attributes: host, port, username, password
3. When the Web server comes up, it will query for all existing cities in the DB. If there are none, it will traverse the json files in /data folder and will use
   these to init the DB. If there are existing cites, no action will be taken.

## Task details

1. Average temp for each city for each day - use the avarages collection to get this data, e.g. GET localhost:3000/api/avarages
2. Lowest humidity point (place + time) - use the humidity points collection to get this data, e.g. GET localhost:3000/api/humidityPoints?sort={"by": "humidity"}&limit=1
3. Rank the cities by their last (most recent) “feels_like” value (order should be low to high) - use the cities collection to get this data, e.g. GET localhost:3000/api/cities?sort={"by": "feelsLike"}
4. Constraints/index (not implemented)
    - Cities should be constrained by a unique city identifier - the weather API is using it own city identifiers which can be used here as well, or otherwise we will need to couple city with state/country and/or zip, or use the geo location lat/lon range to identify the city
    - Cities can be indexed by name (or combination of name/state/country) to allow for easier searches of cities, however we will likely want to search by geo location, which will require storing the city's geo range and a much more complex indexing solution
    - hourly forecasts can be constrainted by the timestamp and get location (in our case, derived from the city relation)
    - if we have common calculation on the forecasts data, such as loweset humidity or avarage temp, it may be helpful to create views/index with less data (to improve DB-level calculations) or do the calculations on INSERT
