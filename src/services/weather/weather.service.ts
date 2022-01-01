import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readdirSync, readFileSync } from 'fs';
import { City } from 'src/models/city';
import { HourlyForecast } from 'src/models/hourlyForecast';
import { Repository } from 'typeorm';

@Injectable()
export class WeatherService {
    constructor(
        @InjectRepository(City)
        private citiesRepository: Repository<City>,
        @InjectRepository(HourlyForecast)
        private forecastsRepository: Repository<HourlyForecast>
    ) {
        this.initData();
    }

    async initData() {
        // one-time data load - only if we don't find any data in the DB
        const cities = await this.citiesRepository.find();
        console.log(`Should we init data? ${!cities || cities.length === 0}
        current cities: ${cities ? cities.map(city => city.name).join(', ') : ''}`);
        if (!cities || cities.length === 0) {
            console.log(`Start data load`);
            // data is loaded from json files
            const files = readdirSync('data');
            console.log(
                `Start importing cities: ${files
                    .map(file => {
                        file.split('.')[0];
                    })
                    .join(', ')}`
            );
            if (files) {
                files.forEach(async file => {
                    const cityName = file.split('.')[0];
                    const jsonData = readFileSync(`data/${file}`).toString();
                    const json = JSON.parse(jsonData);
                    const city = new City();
                    city.name = cityName;
                    city.lat = json.lat;
                    city.lon = json.lon;
                    city.latestHourlyForecast = 0;
                    city.forecasts = json.hourly.map(hourly => {
                        const forecast = new HourlyForecast();
                        forecast.feelsLike = parseFloat(hourly['feels_like']);
                        forecast.humidity = parseFloat(hourly['humidity']);
                        forecast.temp = parseFloat(hourly['temp']);
                        forecast.timestamp = parseInt(hourly['dt']);
                        // update city if latest forecast
                        if (city.latestHourlyForecast < forecast.timestamp) {
                            city.latestHourlyForecast = forecast.timestamp;
                            city.feelsLike = forecast.feelsLike;
                        }
                        return forecast;
                    });
                    console.log(`Create city:
                    ${city.name}`);
                    await this.createCity(city);
                });
            }
            console.log(`Done data load`);
        }
    }

    findAllCities(order?: any): Promise<City[]> {
        return this.citiesRepository.find({
            relations: ['forecasts'],
            order
        });
    }

    findAllForecasts(select?: any[], order?: any, take?: number): Promise<HourlyForecast[]> {
        return this.forecastsRepository.find({
            relations: ['city'],
            select,
            order,
            take
        });
    }

    async createCity(city: City): Promise<City> {
        return await this.citiesRepository.save(city);
    }
}
