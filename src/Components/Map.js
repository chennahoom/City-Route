import { useState } from "react";

import React from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
};
const options = {
  //   styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
};

const centers = {
  "Tel-Aviv": {
    lat: 32.109333,
    lng: 34.855499,
  },
  Berlin: {
    lat: 52.520008,
    lng: 13.404954,
  },
  London: {
    lat: 51.50088279063649,
    lng: -0.12446446928391436,
  },
  Paris: {
    lat: 48.856613,
    lng: 2.352222,
  },
  Amsterdam: {
    lat: 52.370216,
    lng: 4.895168,
  },
};

// const data = mapData[city]
// data.center

const stopsCity = {
  Amsterdam: [
    { lat: 52.3609, lng: 4.88516 },
    { lat: 52.36682, lng: 4.91609 },
    { lat: 52.37534, lng: 4.88406 },
    { lat: 52.36718, lng: 4.86807 },
    { lat: 52.35803, lng: 4.86851 },
  ],
  Berlin: [
    { lat: 52.51862, lng: 13.37618 },
    { lat: 52.51639, lng: 13.37765 },
    { lat: 52.51144, lng: 13.38051 },
    { lat: 52.53551, lng: 13.39021 },
    { lat: 52.50277, lng: 13.39563 },
  ],
  London: [
    { lat: 51.50088279063649, lng: -0.12446446928391436 },
    { lat: 51.5154145182744, lng: -0.14213606134465054 },
    { lat: 51.50343752527545, lng: -0.11947859997090264 },
    { lat: 51.50149087394934, lng: -0.1418041711351016 },
    { lat: 51.49869514754726, lng: -0.1295247403352302 },
    { lat: 51.50709261170342, lng: -0.16621691046445272 },
  ],
  Paris: [
    { lat: 48.85308, lng: 2.3499 },
    { lat: 48.85542, lng: 2.34497 },
    { lat: 48.86068, lng: 2.33763 },
    { lat: 48.86786, lng: 2.31276 },
    { lat: 48.85607, lng: 2.29297 },
  ],
  "Tel-Aviv": [
    { lat: 32.05567, lng: 34.75608 },
    { lat: 32.06296, lng: 34.76644 },
    { lat: 32.0684, lng: 34.76809 },
    { lat: 32.08287, lng: 34.76768 },
    { lat: 32.08067, lng: 34.78052 },
    { lat: 32.07129, lng: 34.78713 },
  ],
};

function Map(props) {
  // useEffect (() => {
  // 	fetch(`https://city-route.herokuapp.com/api/stops/${props.stop}`)
  // 		.then(res => res.json())
  // 		.then(body => {
  // 			console.log(body)
  // 			console.log(props.stop)
  // 			console.log(body.location_coords[0])
  // 			setStopData(body.location_coords[0])
  // 		})

  // }, [props.showStops])

  // console.log(stopsCity.ci)

  const city_name = props.city;
  let center = centers[city_name];
  if (!center) {
    center = { lat: 33.109333, lng: 33.855499 };
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCqp3XhCNtt2GaQgDAhRvrjfO-A8zVQPWc",
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  // if (!props.stops.length) return 'loading...';

  console.log(city_name);
  return (
    <div>
      {/* <SearchMap panTo={panTo} /> */}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {/* {props.showStops?(
        {stopsCity.Paris.map((stop, i) => (
          <Marker
            key={i}
            position={{
              lat: stop.lat,
              lng: stop.lng,
            }}
          />
        ))} */}
      </GoogleMap>
    </div>
  );
}

export default Map;

// import { useState, useEffect } from 'react';

// import React from 'react';
// import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline, Autocomplete } from '@react-google-maps/api';
// import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

// import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
// import '@reach/combobox/styles.css';
// import SearchMap from './SearchMap';

// const libraries = ['places'];
// const mapContainerStyle = {
// 	// width: '800px',
// 	height: '800px',
// 	margin: '0 auto',
// };
// const options = {
// 	//   styles: mapStyles,
// 	disableDefaultUI: false,
// 	zoomControl: true,
// };

// // const mapData = {
// // 	Berlin: {
// // 		center: {},
// // 	},
// // 	'Tel-Aviv': {
// // 		center: {},
// // 	},
// // };

// // const data = mapData[city]
// // data.center

// function Map(props) {

// 	const { isLoaded, loadError } = useLoadScript({
// 		googleMapsApiKey: 'AIzaSyCqp3XhCNtt2GaQgDAhRvrjfO-A8zVQPWc',
// 		libraries,
// 	});

// 	const [markers, setMarkers] = useState([]);

// 	const mapRef = React.useRef();
// 	const onMapLoad = React.useCallback(map => {
// 		mapRef.current = map;
// 	}, []);

// 	const panTo = React.useCallback(({ lat, lng }) => {
// 		mapRef.current.panTo({ lat, lng });
// 		mapRef.current.setZoom(14);
// 	}, []);

// 	if (loadError) return 'Error';
// 	if (!isLoaded) return 'Loading...';

// 	if (!props.stops.length) return 'loading...';

// 	return (
// 		<div>
// 			{/* <SearchMap panTo={panTo} /> */}

// 			<GoogleMap
// 				mapContainerStyle={mapContainerStyle}
// 				zoom={13}
// 				center={{
// 					lat: props.stops[0].location_coords[0]?.lat,
// 					lng: props.stops[0].location_coords[0]?.lng,
// 				}}
// 				options={options}
// 				onLoad={onMapLoad}>

// 				{props.stops.map((stop, i) => (
// 					<Marker
// 						key={stop.stop_name}
// 						position={{
// 							lat: stop.location_coords[0]?.lat,
// 							lng: stop.location_coords[0]?.lng,
// 						}}
// 					/>
// 				))}
// 			</GoogleMap>
// 		</div>
// 	);
// }

// export default Map;
