import { Controller, Get } from '@nestjs/common';

@Controller('cities')
export class CitiesController {
    @Get()
    async getAllCities() {
        return;
    }
}
