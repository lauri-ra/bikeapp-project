import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma/connect';

export async function GET(request: Request) {
	// Get the current page from the url params
	const { searchParams } = new URL(request.url);
	const param = searchParams.get('page');

	// Make sure that the page is of type string. If it is, turn it to a number, else default to 1.
	const page = typeof param === 'string' ? +param : 1;

	// Take 10 elements from the db according to the current page location.
	const stations = await prisma.stations.findMany({
		take: 10,
		skip: (page - 1) * 10,
	});

	return NextResponse.json({ stations, page });
}
