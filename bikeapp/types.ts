import { Prisma } from '@prisma/client';

export interface Journey {
	id: number;
	return: Date;
	departure_station_id: number;
	departure_station_name: string;
	return_station_id: number;
	return_station_name: string;
	covered_distance_m: number;
	duration_s: number;
	departure: Date;
}

export interface Station {
	station_id: number;
	station_name_fi: string;
	station_name_swe: string;
	address_fi: string;
	address_swe: string;
	city_fi: string | null;
	city_swe: string | null;
	capacity: number;
	lat: Prisma.Decimal;
	lon: Prisma.Decimal;
}
