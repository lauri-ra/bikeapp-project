import React from 'react';
import Link from 'next/link';
import { Journey, Station, StationStats } from '@/types';

interface StationCardProps {
	station: Station | null;
	stats: StationStats;
}

const StationCard: React.FC<StationCardProps> = ({ station, stats }) => {
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
				<div className='mb-2 rounded-md border border-gray-300 p-2'>
					Total returns {stats.returns}
				</div>
				<div className='mb-2 rounded-md border border-gray-300 p-2'>
					Total departures {stats.departures}
				</div>
				<div className='mb-2 rounded-md border border-gray-300 p-2'>
					Average departure {stats.avgDeparture} km
				</div>
				<div className='mb-2 rounded-md border border-gray-300 p-2'>
					Average return {stats.avgReturn} km
				</div>
			</div>

			<div className='h-full rounded-lg border border-orange-400 p-4 shadow-md'>
				<div className='mb-4 font-semibold'>
					Top return stations for journeys starting from this station
				</div>
				{stats.topReturns.map((journey: Journey) => (
					<div
						key={journey.return_station_id}
						className='mb-2 rounded-lg border border-gray-300 p-2 hover:bg-sky-200/50'
					>
						<Link href={`/stations/${journey.return_station_id}`}>
							<div className='text-blue-500'>{journey.return_station_name}</div>
						</Link>
					</div>
				))}
			</div>

			<div className='h-full rounded-lg border border-orange-400 p-4 shadow-md'>
				<div className='mb-4 font-semibold'>
					Top departure stations for journeys ending at this station
				</div>
				{stats.topDepartures.map((journey: Journey) => (
					<div
						key={journey.departure_station_id}
						className='mb-2 rounded-md border border-gray-300 p-2 hover:bg-sky-200/50'
					>
						<Link href={`/stations/${journey.departure_station_id}`}>
							<div className='text-blue-500'>{journey.departure_station_name}</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default StationCard;
