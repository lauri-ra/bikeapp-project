import { prisma } from '@/prisma/connect';
import StationCard from '@/app/components/StationCard';

export default async function Page({ params }: { params: { id: string } }) {
	const stationId = parseInt(params.id);

	const station = await prisma.stations.findUnique({ where: { station_id: stationId } });
	const departures = await prisma.journeys.count({ where: { departure_station_id: stationId } });
	const returns = await prisma.journeys.count({ where: { return_station_id: stationId } });

	return <StationCard station={station} departures={departures} returns={returns} />;
}
