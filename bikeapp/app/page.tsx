import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex h-screen items-center justify-center'>
			<div>
				<div className='mb-10 flex justify-center text-6xl tracking-wide'>bikeapp</div>
				<div className='flex justify-center text-lg'>
					<Link href='/journeys'>
						<button className='mr-4 rounded-lg bg-sky-500 px-6 py-4 font-semibold text-white hover:bg-sky-400'>
							Journeys
						</button>
					</Link>
					<Link href='/stations'>
						<button className='ml-4 rounded-lg bg-sky-500 px-6 py-4 font-semibold text-white hover:bg-sky-400'>
							Stations
						</button>
					</Link>
				</div>
			</div>
		</main>
	);
}
