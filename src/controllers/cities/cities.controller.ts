import { Controller, Get } from '@nestjs/common';
import { WeatherService } from 'src/services/weather/weather.service';

@Controller('cities')
export class CitiesController {
    constructor(private weatherService: WeatherService) {}

    @Get()
    async getAllCities() {
        return this.weatherService.findAll();
    }
}
