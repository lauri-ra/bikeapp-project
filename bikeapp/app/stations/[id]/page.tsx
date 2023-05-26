import { prisma } from '@/prisma/connect';
import StationCard from '@/app/components/StationCard';
import { Journey } from '@/types';

// TODO: Move this to api routes??
async function getTopReturns(stationId: number): Promise<Journey[]> {
	// TODO: Check if aggregation like this works with prisma
	// const topReturns = await prisma.journeys.groupBy({
	// 	by: ['return_station_id'],
	// 	where: { departure_station_id: stationId },
	// 	orderBy: {
	// 		_count: {
	// 			departure_station_id: 'desc',
	// 		},
	// 	},
	// 	take: 5,
	// });

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

export default async function Page({ params }: { params: { id: string } }) {
	const stationId = parseInt(params.id);

	const station = await prisma.stations.findUnique({ where: { station_id: stationId } });

	const departures = await prisma.journeys.count({ where: { departure_station_id: stationId } });
	const returns = await prisma.journeys.count({ where: { return_station_id: stationId } });

	const topReturns: Journey[] = await getTopReturns(stationId);

	return (
		<StationCard
			station={station}
			departures={departures}
			returns={returns}
			topReturns={topReturns}
		/>
	);
}
