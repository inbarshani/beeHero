import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { HourlyForecast } from './hourlyForecast';

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('float')
    lat: number;

    @Column('float')
    lon: number;

    @OneToMany(() => HourlyForecast, forecast => forecast.city, { cascade: true })
    forecasts: HourlyForecast[];
}
