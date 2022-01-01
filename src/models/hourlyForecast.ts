import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { City } from './city';

@Entity()
export class HourlyForecast {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => City, city => city.forecasts)
    city: City;

    @Column()
    timestamp: number;

    @Column()
    temp: number;

    @Column()
    feelsLike: number;

    @Column()
    humidity: number;
}
