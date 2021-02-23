import TourGuideTrip from './TourGuideTrip';
import React from 'react';

function TripList(props) {
	return (
		<div>
			{props.tourGuideTrips.map((tripId, i) => (
				<TourGuideTrip
					editTrip={props.editTrip}
					key={i}
					data={tripId}
					setEditTrip={props.setEditTrip}
					listChanged={props.listChanged}
					deleteTrip={props.deleteTrip}
					onDuplicate={props.onDuplicate}
				/>
			))}
		</div>
	);
}
export default TripList;
