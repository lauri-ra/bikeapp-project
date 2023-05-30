'use client';

import Link from 'next/link';

const Navbar = () => {
	return (
		<div>
			{/* <div className='my-4 flex justify-center border-2 text-xl tracking-wide'> */}
			<div className='sticky top-0 flex w-full items-end justify-center border-2 py-3 text-xl ring-1 ring-white/10 backdrop-blur'>
				<Link href='/' className='ml-6 text-blue-500 hover:text-blue-700'>
					Home
				</Link>
				<Link href='/journeys' className='ml-6 text-blue-500 hover:text-blue-700'>
					Journeys
				</Link>
				<Link href='/stations' className='ml-6 text-blue-500 hover:text-blue-700'>
					Stations
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
