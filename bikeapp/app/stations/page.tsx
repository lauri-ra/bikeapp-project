import axios from 'axios';
import Link from 'next/link';
import { Station } from '@/types';
import { prisma } from '@/prisma/connect';

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const param = searchParams.page || '1';
	const response = await axios.get(`http://localhost:3000/api/stations?page=${param}`);
	const { stations, page } = await response.data;

	// These help with the conditial rendering of the nav buttons.
	const stationCount = await prisma.stations.count();
	const maxPage = Math.ceil(stationCount / 10);

	return (
		<div>
			<div id='station-list'>
				{stations.map((station: Station) => (
					<div id='station' key={station.station_id} className='my-2 border-2'>
						<Link href={`/stations/${station.station_id}`}>
							<div>{station.station_id}</div>
							<div>{station.station_name_fi}</div>
						</Link>
					</div>
				))}
			</div>
			<div className='flex items-center justify-center'>
				{page > 1 && (
					<Link
						href={`/stations/?page=${page - 1}`}
						className='ml-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600'
					>
						Prev
					</Link>
				)}
				{page < maxPage && (
					<Link
						href={`/stations/?page=${page + 1}`}
						className='ml-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600'
					>
						Next
					</Link>
				)}
			</div>
		</div>
	);
}
