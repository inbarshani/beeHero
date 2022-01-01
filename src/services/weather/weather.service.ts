import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/models/city';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class WeatherService {
    constructor(
        @InjectRepository(City)
        private citiesRepository: Repository<City>
    ) {}

    findAll(options: FindManyOptions): Promise<City[]> {
        return this.citiesRepository.find(options);
    }

    async create(city: City): Promise<City> {
        return await this.citiesRepository.create(city);
    }
}
