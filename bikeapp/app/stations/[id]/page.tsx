import { prisma } from '@/prisma/connect';
import StationCard from '@/app/components/StationCard';
import { Journey } from '@/types';

// TODO: Move this to api routes??
// Get top 5 most popular return stations for journeys starting from the station
async function getTopReturns(stationId: number): Promise<Journey[]> {
	const topReturns: Journey[] = await prisma.$queryRaw`
		SELECT return_station_id, return_station_name
		FROM journeys
		WHERE departure_station_id = ${stationId}
		GROUP BY return_station_id, return_station_name
		ORDER BY COUNT(*) DESC
		LIMIT 5;
	`;

	return topReturns;
}

// Top 5 most popular departure stations for journeys ending at the station
async function getTopDepartures(stationId: number): Promise<Journey[]> {
	const getTopDepartures: Journey[] = await prisma.$queryRaw`
		SELECT departure_station_id, departure_station_name, COUNT(*) AS departure_count
		FROM journeys
		WHERE return_station_id = ${stationId}
		GROUP BY departure_station_id, departure_station_name
		ORDER BY departure_count DESC
		LIMIT 5;
	`;

	return getTopDepartures;
}

export default async function Page({ params }: { params: { id: string } }) {
	const stationId = parseInt(params.id);

	const station = await prisma.stations.findUnique({ where: { station_id: stationId } });

	const departures = await prisma.journeys.count({ where: { departure_station_id: stationId } });
	const returns = await prisma.journeys.count({ where: { return_station_id: stationId } });

	const topReturns: Journey[] = await getTopReturns(stationId);
	const topDepartures: Journey[] = await getTopDepartures(stationId);

	return (
		<StationCard
			station={station}
			departures={departures}
			returns={returns}
			topReturns={topReturns}
			topDepartures={topDepartures}
		/>
	);
}
