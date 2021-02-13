import { useState, useEffect } from 'react';

import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import SearchMap from './SearchMap';


const libraries = ['places'];
const mapContainerStyle = {
	width: '750px',
	height: '500px',
};
const options = {
	//   styles: mapStyles,
	disableDefaultUI: false,
	zoomControl: true,
};


// const mapData = {
// 	Berlin: {
// 		center: {},
// 	},
// 	'Tel-Aviv': {
// 		center: {},
// 	},
// };

// const data = mapData[city]
// data.center

function Map(props) {

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyCqp3XhCNtt2GaQgDAhRvrjfO-A8zVQPWc',
		libraries,
	});

	const [markers, setMarkers] = useState([]);

	const mapRef = React.useRef();
	const onMapLoad = React.useCallback(map => {
		mapRef.current = map;
	}, []);

	const panTo = React.useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

	if (loadError) return 'Error';
	if (!isLoaded) return 'Loading...';

	if (!props.stops.length) return 'loading...';

	return (
		<div>
			<SearchMap panTo={panTo} />

			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={13}
				center={{
					lat: props.stops[0].location_coords[0]?.lat,
					lng: props.stops[0].location_coords[0]?.lng,
				}}
				options={options}
				onLoad={onMapLoad}>


				{props.stops.map((stop, i) => (
					<Marker
						key={stop.stop_name}
						position={{
							lat: stop.location_coords[0]?.lat,
							lng: stop.location_coords[0]?.lng,
						}}
					/>
				))}
			</GoogleMap>
		</div>
	);
}

export default Map;

