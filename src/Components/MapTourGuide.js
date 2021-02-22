import { useState, useEffect } from 'react';

import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import SearchMap from '../Components/SearchMap';

const libraries = ['places'];
const mapContainerStyle = {
	width: '700px',
	height: '500px',
};
const options = {
	//   styles: mapStyles,
	disableDefaultUI: false,
	zoomControl: true,
};

// function Search({ panTo }) {
// 	const {
// 		ready,
// 		value,
// 		suggestions: { status, data },
// 		setValue,
// 		clearSuggestions,
// 	} = usePlacesAutocomplete({
// 		requestOptions: {
// 			location: { lat: () => 43.6532, lng: () => -79.3832 },
// 			radius: 100 * 1000,
// 		},
// 	});

// 	const handleInput = e => {
// 		setValue(e.target.value);
// 	};
// 	return (
// 		<div className="search">
// 			<Combobox
// 				onSelect={async address => {
// 					setValue(address, false);
// 					clearSuggestions();
// 					try {
// 						const results = await getGeocode({ address });
// 						const { lat, lng } = await getLatLng(results[0]);
// 						panTo({ lat, lng });
// 					} catch (error) {
// 						console.log('error');
// 					}
// 				}}>
// 				<ComboboxInput value={value} onChange={handleInput} disabled={!ready} placeholder="Search your location" />
// 				<ComboboxPopover>
// 					<ComboboxList>
// 						{status === 'OK' && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
// 					</ComboboxList>
// 				</ComboboxPopover>
// 			</Combobox>
// 		</div>
// 	);
// }

const centers = {
	'Tel-Aviv': {
		lat: 32.109333,
		lng: 34.855499,
	},
	'Berlin': {
		lat: 52.520008,
		lng: 13.404954,
	},
	'London': {
		lat: 51.50088279063649,
		lng: -0.12446446928391436,
	},
	'Paris': {
		lat: 48.856613,
		lng: 2.352222,
	},
	'Amsterdam': {
		lat: 52.370216,
		lng: 4.895168,
	},
};

function MapTG(props) {
	console.log('MapTG', props);
	const { stops = [], selectedStops = [], trip } = props;

	const city = trip.trip_name_city;

	let center = centers[city];
	console.log('center', center);

	if (!center) {
		center = { lat: 33.109333, lng: 33.855499 };
	}

	const selectedMarkers = selectedStops.map(selectedId => {
		const stop = stops.find(stop => stop.id == selectedId);
		return {
			lat: stop?.location_coords[0].lat,
			lng: stop?.location_coords[0].lng,
		};
	});
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyCqp3XhCNtt2GaQgDAhRvrjfO-A8zVQPWc',
		libraries,
	});

	const [markers, setMarkers] = React.useState([]);
	const [selected, setSelected] = React.useState(null);

	const onMapClick = React.useCallback(e => {
		setMarkers(current => [
			...current,
			{
				lat: e.latLng.lat(),
				lng: e.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

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

	console.log('selectedMarkers', selectedMarkers);

	return (
		<div className="nap-TG">
			{/* <Locate panTo={panTo} /> */}
			{/* <SearchMap panTo={panTo} /> */}

			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={11}
				center={center}
				options={options}
				onClick={onMapClick}
				onLoad={onMapLoad}>
				{selectedMarkers.map((step, i) => (
					<Marker key={i} position={{ lat: step.lat, lng: step.lng }} />
				))}

				{selected ? (
					<InfoWindow
						position={{ lat: selected.lat, lng: selected.lng }}
						onCloseClick={() => {
							setSelected(null);
						}}>
						<div>
							<h5>Ticket needed?</h5>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</div>
	);
}

export default MapTG;
