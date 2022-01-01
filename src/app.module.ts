import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './models/city';
import { HourlyForecast } from './models/hourlyForecast';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '54.197.201.26',
            port: 5342,
            username: 'postgres -e',
            password: 'pa55w0rd',
            database: 'BeeHeroTask',
            entities: [City, HourlyForecast],
            synchronize: true
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
