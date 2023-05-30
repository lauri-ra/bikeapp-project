import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/connect';
import { Journey } from '@/types';

// Get top 5 most popular return stations for journeys starting from the station
async function getTopReturns(stationId: number): Promise<Journey[]> {
	const topReturns: Journey[] = await prisma.$queryRaw`
		SELECT return_station_id, return_station_name
		FROM journeys
		WHERE departure_station_id = ${stationId}
		GROUP BY return_station_id, return_station_name
		ORDER BY COUNT(*) DESC
		LIMIT 5;
	`;

	return topReturns;
}

// Top 5 most popular departure stations for journeys ending at the station
async function getTopDepartures(stationId: number): Promise<Journey[]> {
	const topDepartures: Journey[] = await prisma.$queryRaw`
		SELECT departure_station_id, departure_station_name
		FROM journeys
		WHERE return_station_id = ${stationId}
		GROUP BY departure_station_id, departure_station_name
		ORDER BY COUNT(*) DESC
		LIMIT 5;
	`;

	return topDepartures;
}

async function getAvgDeparture(stationId: number): Promise<string | null> {
	const result = await prisma.journeys.aggregate({
		_avg: {
			covered_distance_m: true,
		},
		where: {
			departure_station_id: stationId,
		},
	});

	// Get the average result from the query and return it in km
	const average = result._avg.covered_distance_m;
	const averageInKm = average ? (average / 1000).toFixed(2) : null;
	return averageInKm;
}

async function getAvgReturn(stationId: number): Promise<string | null> {
	const result = await prisma.journeys.aggregate({
		_avg: {
			covered_distance_m: true,
		},
		where: {
			return_station_id: stationId,
		},
	});

	// Get the average result from the query and return it in km
	const average = result._avg.covered_distance_m;
	const averageInKm = average ? (average / 1000).toFixed(2) : null;
	return averageInKm;
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const stationId = parseInt(params.id);

	const departures = await prisma.journeys.count({ where: { departure_station_id: stationId } });
	const returns = await prisma.journeys.count({ where: { return_station_id: stationId } });

	const [topReturns, topDepartures] = await Promise.all([
		getTopReturns(stationId),
		getTopDepartures(stationId),
	]);

	const [avgDeparture, avgReturn] = await Promise.all([
		getAvgDeparture(stationId),
		getAvgReturn(stationId),
	]);

	const stats = {
		departures,
		returns,
		topDepartures,
		topReturns,
		avgDeparture,
		avgReturn,
	};

	return NextResponse.json(stats);
}
