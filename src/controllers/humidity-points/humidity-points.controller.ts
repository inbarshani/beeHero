import { Controller, Get, Query } from '@nestjs/common';
import { SortParam } from 'src/decorator/sortParam';
import { WeatherService } from 'src/services/weather/weather.service';

@Controller('humidityPoints')
export class HumidityPointsController {
    constructor(private weatherService: WeatherService) {}

    @Get()
    async getHumidityPoints(@SortParam() sortParam: { by: string; order?: 'ASC' | 'DESC' }, @Query('limit') limit: number) {
        let order = undefined;
        let take = undefined;
        if (sortParam && sortParam.by) {
            order = { [sortParam.by]: sortParam.order ? sortParam.order : 'ASC' };
        }
        if (limit !== undefined) {
            take = limit;
        }
        const humidityPoints = await this.weatherService.findAllForecasts(['id', 'humidity', 'timestamp', 'city'], order, take);
        return humidityPoints.map(point => {
            return {
                humidity: point.humidity,
                date: new Date(point.timestamp * 1000).toLocaleString(),
                city: point.city ? point.city.name : ''
            };
        });
    }
}
