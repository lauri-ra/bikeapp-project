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
