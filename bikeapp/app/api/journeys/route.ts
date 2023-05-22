import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma/connect';

export async function GET() {
	console.log('GET request');

	const journeys = await prisma.journeys.findMany();

	return NextResponse.json(journeys);
}

export async function POST() {
	console.log('POST request');
}
