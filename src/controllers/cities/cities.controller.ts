import { Controller, Get } from '@nestjs/common';
import { SortParam } from 'src/decorator/sortParam';
import { WeatherService } from 'src/services/weather/weather.service';

@Controller('cities')
export class CitiesController {
    constructor(private weatherService: WeatherService) {}

    @Get()
    async getAllCities(@SortParam() sortParam: { by: string; order?: 'ASC' | 'DESC' }) {
        if (sortParam && sortParam.by) {
            return this.weatherService.findAll({ [sortParam.by]: sortParam.order ? sortParam.order : 'ASC' });
        } else {
            return this.weatherService.findAll();
        }
    }
}
