import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { City } from './city';

@Entity({ name: 'forecast' })
export class HourlyForecast {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => City, city => city.forecasts)
    city: City;

    @Column()
    timestamp: number;

    @Column('float')
    temp: number;

    @Column('float')
    feelsLike: number;

    @Column('float')
    humidity: number;
}
