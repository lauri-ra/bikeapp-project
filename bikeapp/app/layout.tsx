import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'bikeapp',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='h-screen bg-gradient-to-tr from-cyan-50 via-sky-50 to-orange-50'>
			<body className={inter.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
