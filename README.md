# beeHero

## Weather Rest API

REST API for a 5 day weather forecast of 5 cities: Jerusalem, Haifa, Tel Aviv,
Eilat, Tiberias. Data is downloaded from https://openweathermap.org/api, and stored in a PostgreSQL DB locally.

- **Note**: the free API only allows for hourly forecasts up to 3 days \*

## API

- **GET /api/cities** - return a collection of cities and their 5 days weather forecast. You can use a 'sort' query param to sort the collection, e.g. GET /api/cities?sort={by: feels-like}
- **GET /api/avarages** - return a collection of cities and their avarage temp per day
- **GET /api/humidityPoints** - return a collection of humidity forecasts. You can use a 'sort' query param to sort the collection, e.g. GET /api/humidityPoints?sort={by: value, order: desc}

## Implementation

API is developed using https://nestjs.com/ (typescript/node.js)
