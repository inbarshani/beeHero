import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { HourlyForecast } from './hourlyForecast';

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lat: number;

    @Column()
    lon: number;

    @OneToMany(() => HourlyForecast, forecast => forecast.city)
    forecasts: HourlyForecast[];
}
