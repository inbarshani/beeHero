import { Controller, Get } from '@nestjs/common';
import { WeatherService } from 'src/services/weather/weather.service';

@Controller('avarages')
export class AvaragesController {
    constructor(private weatherService: WeatherService) {}

    @Get()
    async getCityAvarages() {
        const cities = await this.weatherService.findAllCities();
        const avarages = cities.map(_city => {
            const cityData = {
                city: _city.name,
                days: []
            };

            const dayForecasts = {};
            _city.forecasts.forEach(forecast => {
                const forecastDate = new Date(forecast.timestamp * 1000).toLocaleDateString();
                if (dayForecasts[forecastDate]) {
                    dayForecasts[forecastDate].sum += forecast.temp;
                    dayForecasts[forecastDate].count++;
                } else {
                    dayForecasts[forecastDate] = { sum: forecast.temp, count: 1 };
                }
            });
            cityData.days = Object.keys(dayForecasts).map(date => {
                return {
                    day: date,
                    avgTemp: dayForecasts[date].sum / dayForecasts[date].count
                };
            });

            return cityData;
        });
        return avarages;
    }
}
