import { prisma } from '../../prisma/connect';
import Link from 'next/link';

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	// These help with the conditial rendering of the nav buttons.
	const stationCount = await prisma.stations.count();
	const maxPage = Math.round(stationCount / 10);

	// Make sure that the page is of type string. If it is, turn it to a number, else default to 1.
	const page = typeof searchParams.page === 'string' ? +searchParams.page : 1;

	// Take 10 elements from the db according to the current page location.
	const stations = await prisma.stations.findMany({
		take: 10,
		skip: (page - 1) * 10,
	});

	return (
		<div>
			{stations.map((station) => (
				<div key={station.station_id} className='my-2 border-2'>
					<Link href={`/stations/${station.station_id}`}>
						<div>{station.station_id}</div>
						<div>{station.station_name_fi}</div>
					</Link>
				</div>
			))}
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
