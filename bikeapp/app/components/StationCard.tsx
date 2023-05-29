import React from 'react';
import Link from 'next/link';
import { Journey, Station } from '@/types';

interface StationCardProps {
	station: Station | null;
	departures: number;
	returns: number;
	topReturns: Journey[];
	topDepartures: Journey[];
	avgDeparture: string | null;
	avgReturn: string | null;
}

const StationCard: React.FC<StationCardProps> = ({
	station,
	departures,
	returns,
	topReturns,
	topDepartures,
	avgDeparture,
	avgReturn,
}) => {
	const city = station?.city_fi === ' ' ? 'city not specified' : station?.city_fi;

	return (
		<div className='mt-20 grid grid-cols-3 place-items-center gap-2'>
			<div className='grid h-full grid-cols-2 gap-3 rounded-lg border border-orange-400 p-4 shadow-md'>
				<div className='col-span-2 justify-self-start p-2'>
					<div className='pb-2 text-4xl font-bold'>
						{station?.station_id}. {station?.station_name_fi}
					</div>
					<div className='text-xl font-semibold'>
						{station?.address_fi}, {city}
					</div>
				</div>
				<div className='mb-2 rounded-md border border-gray-300 p-2'>
					Capacity of {station?.capacity} bikes
				</div>
				<div className='mb-2 rounded-md border border-gray-300 p-2'>Total returns {returns}</div>
				<div className='mb-2 rounded-md border border-gray-300 p-2'>
					Total departures {departures}
				</div>
				<div className='mb-2 rounded-md border border-gray-300 p-2'>
					Average departure {avgDeparture} km
				</div>
				<div className='mb-2 rounded-md border border-gray-300 p-2'>
					Average return {avgReturn} km
				</div>
			</div>

			<div className='h-full rounded-lg border border-orange-400 p-4 shadow-md'>
				<div className='mb-4 font-semibold'>
					Top return stations for journeys starting from this station
				</div>
				{topReturns.map((station) => (
					<div
						key={station.return_station_id}
						className='mb-2 rounded-lg border border-gray-300 p-2 hover:bg-sky-200/50'
					>
						<Link href={`/stations/${station.return_station_id}`}>
							<div className='text-blue-500'>{station.return_station_name}</div>
						</Link>
					</div>
				))}
			</div>

			<div className='h-full rounded-lg border border-orange-400 p-4 shadow-md'>
				<div className='mb-4 font-semibold'>
					Top departure stations for journeys ending at this station
				</div>
				{topDepartures.map((station) => (
					<div
						key={station.departure_station_id}
						className='mb-2 rounded-md border border-gray-300 p-2 hover:bg-sky-200/50'
					>
						<Link href={`/stations/${station.departure_station_id}`}>
							<div className='text-blue-500'>{station.departure_station_name}</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default StationCard;
