import { Station } from '@/types';
import React from 'react';

const StationCard: React.FC<{ station: Station | null }> = ({ station }) => {
	return (
		<div>
			<div>{station?.station_name_fi}</div>
			<div>{station?.address_fi}</div>
			<div>{station?.capacity}</div>
		</div>
	);
};

export default StationCard;
