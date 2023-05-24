import { Station } from '@/types';
import React from 'react';

interface StationCardProps {
	station: Station | null;
	departures: number;
	returns: number;
}

const StationCard: React.FC<StationCardProps> = ({ station, departures, returns }) => {
	const city = station?.city_fi === ' ' ? 'city not specified' : station?.city_fi;

	return (
		<div>
			<div className='text-3xl font-semibold tracking-wide'>
				{station?.station_id} - {station?.station_name_fi}
			</div>
			<div>
				{station?.address_fi}, {city}
			</div>
			<div>Capacity of {station?.capacity} bikes</div>
			<div>Returns {returns}</div>
			<div>Departures {departures}</div>
		</div>
	);
};

export default StationCard;
