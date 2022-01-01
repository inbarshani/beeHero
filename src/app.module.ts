import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AvaragesController } from './controllers/avarages/avarages.controller';
import { CitiesController } from './controllers/cities/cities.controller';
import { HumidityPointsController } from './controllers/humidity-points/humidity-points.controller';
import { City } from './models/city';
import { HourlyForecast } from './models/hourlyForecast';
import { WeatherService } from './services/weather/weather.service';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '54.197.201.26',
            port: 5432,
            username: 'postgres',
            password: 'pa55w0rd',
            database: 'BeeHeroTask',
            entities: [City, HourlyForecast],
            logging: true,
            synchronize: true
        }),
        TypeOrmModule.forFeature([City])
    ],
    controllers: [CitiesController, HumidityPointsController, AvaragesController],
    providers: [WeatherService]
})
export class AppModule {}
