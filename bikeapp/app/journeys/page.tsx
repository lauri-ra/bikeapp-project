import { prisma } from '../../prisma/connect';
import Link from 'next/link';

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	// These help with the conditial rendering of the nav buttons.
	const journeyCount = await prisma.journeys.count();
	const maxPage = Math.round(journeyCount / 10);

	// Make sure that the page is of type string. If it is, turn it to a number, else default to 1.
	const page = typeof searchParams.page === 'string' ? +searchParams.page : 1;

	// Take 10 elements from the db according to the current page location.
	const journeys = await prisma.journeys.findMany({
		take: 10,
		skip: (page - 1) * 10,
	});

	return (
		<div className='relative mx-8 overflow-x-auto rounded-lg ring-1 ring-neutral-300'>
			<table className='w-full table-auto content-center text-left'>
				<thead className='bg-sky-300 text-xs font-thin uppercase text-gray-700 drop-shadow'>
					<tr>
						<th className='px-6 py-3'>Departure station</th>
						<th className='px-6 py-3'>Return station</th>
						<th className='px-6 py-3'>Covered distance (km)</th>
						<th className='px-6 py-3'>Duration (min)</th>
					</tr>
				</thead>
				<tbody>
					{journeys.map((journey) => (
						<tr key={journey.id} className='hover:bg-neutral-300'>
							<td className='px-6 py-2.5'>{journey.departure_station_name}</td>
							<td className='px-6 py-2.5'>{journey.return_station_name}</td>
							<td className='px-6 py-2.5'>{(journey.covered_distance_m / 1000).toFixed(2)}</td>
							<td className='px-6 py-2.5'>{(journey.duration_s / 60).toFixed(0)}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='flex items-center justify-center'>
				{page > 1 && (
					<Link
						href={`/journeys/?page=${page - 1}`}
						className='ml-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600'
					>
						Prev
					</Link>
				)}
				{page < maxPage && (
					<Link
						href={`/journeys/?page=${page + 1}`}
						className='ml-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600'
					>
						Next
					</Link>
				)}
			</div>
		</div>
	);
}
