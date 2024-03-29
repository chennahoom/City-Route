
import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import '@reach/combobox/styles.css';

const libraries = ['places'];
const mapContainerStyle = {
	width: '850px',
	height: '700px',
};
const options = {
	disableDefaultUI: false,
	zoomControl: true,
};


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
	const { stops = [], selectedStops = [], trip } = props;

	const city = trip.trip_name_city;

	let center = centers[city];

	if (!center) {
		center = { lat: 52.370216, lng: 4.895168 };
	}

	const selectedMarkers = selectedStops.map(selectedId => {
		const stop = stops.find(stop => stop.id === selectedId);
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


	return (
		<div className="nap-TG">

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
