import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/connect';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const stationId = parseInt(params.id);
	const station = await prisma.stations.findUnique({ where: { station_id: stationId } });

	return NextResponse.json(station);
}
