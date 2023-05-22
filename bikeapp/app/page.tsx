import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex h-screen items-center justify-center border-2'>
			<div className='text-slate-600'>
				<div className='flex justify-center text-6xl tracking-wide underline underline-offset-8'>
					bikeapp
				</div>
				<div className='my-7'>Solution for Solita dev-academy 2023 pre-assignment</div>
				<div className='flex justify-center'>
					<Link href='https://github.com/lauri-ra/bikeapp-project'>
						<button className='mx-2 rounded-full bg-gradient-to-r from-pink-300 to-orange-300 px-5 py-4 font-semibold text-white'>
							View on GitHub
						</button>
					</Link>
					<Link href='https://github.com/solita/dev-academy-2023-exercise'>
						<button className='mx-2 rounded-full bg-gradient-to-l from-purple-300 to-sky-200 px-5 py-4 font-semibold text-white hover:bg-slate-400'>
							Check the assignment
						</button>
					</Link>
				</div>
			</div>
		</main>
	);
}
