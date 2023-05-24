import { prisma } from '@/prisma/connect';
import StationCard from '@/app/components/StationView';

export default async function Page({ params }: { params: { id: string } }) {
	const stationId = parseInt(params.id);
	const station = await prisma.stations.findUnique({ where: { station_id: stationId } });

	return <StationCard station={station} />;
}
