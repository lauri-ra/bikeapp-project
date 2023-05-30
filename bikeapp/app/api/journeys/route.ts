import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../prisma/connect';

export async function GET(request: NextRequest) {
	// Get the current page from the url params
	const { searchParams } = new URL(request.url);
	const param = searchParams.get('page');

	// These help with the conditial rendering of the nav buttons.
	const journeyCount = await prisma.journeys.count();
	const maxPage = Math.ceil(journeyCount / 10);

	// Make sure that the page is of type string. If it is, turn it to a number, else default to 1.
	const page = typeof param === 'string' ? +param : 1;

	// Take 10 elements from the db according to the current page location.
	const journeys = await prisma.journeys.findMany({
		take: 10,
		skip: (page - 1) * 10,
	});

	return NextResponse.json({ journeys, page, maxPage });
}

export async function POST() {
	console.log('POST request');
}
