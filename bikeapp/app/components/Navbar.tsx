import Link from 'next/link';

const Navbar = () => {
	return (
		<div>
			<div className='my-4 flex justify-center border-2 text-xl tracking-wide'>
				<Link href='/' className='ml-6 text-blue-500 hover:text-blue-700'>
					home
				</Link>
				<Link href='/journeys' className='ml-6 text-blue-500 hover:text-blue-700'>
					journeys
				</Link>
				<Link href='/stations' className='ml-6 text-blue-500 hover:text-blue-700'>
					stations
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
