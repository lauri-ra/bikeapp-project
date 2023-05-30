import axios from 'axios';
import StationCard from '@/app/components/StationCard';
import { Station, StationStats } from '@/types';

export default async function Page({ params }: { params: { id: string } }) {
	const [stationResponse, statsResponse] = await Promise.all([
		axios.get(`http://localhost:3000/api/stations/${params.id}`),
		axios.get(`http://localhost:3000/api/stations/${params.id}/stats`),
	]);

	const station: Station = stationResponse.data;
	const stats: StationStats = statsResponse.data;

	return <StationCard station={station} stats={stats} />;
}
