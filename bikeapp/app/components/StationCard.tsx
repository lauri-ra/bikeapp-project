import React from 'react';
import Link from 'next/link';
import { Journey, Station } from '@/types';

interface StationCardProps {
	station: Station | null;
	departures: number;
	returns: number;
	topReturns: Journey[];
}

const StationCard: React.FC<StationCardProps> = ({ station, departures, returns, topReturns }) => {
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

			<div className='my-5'>
				<div className='font-semibold'>
					Top return stations for journeys starting from this station
				</div>
				{topReturns.map((station) => (
					<div key={station.return_station_id} className='my-2 border-2'>
						<Link href={`/stations/${station.return_station_id}`}>
							<div>{station.return_station_id}</div>
							<div>{station.return_station_name}</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default StationCard;
