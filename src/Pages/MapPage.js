import { useState, useEffect } from "react";

import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import SearchMap from "../Components/SearchMap";

// import mapStyles from "../Components/utils/mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  width: "750px",
  height: "500px",
};
const options = {
  //   styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
};
const center = {
  lat: 52.51862,
  lng: 13.37618,
};

function MapPage(props) {
  console.log(props.stops);
  // const center = {
  //   lat: props.stops[2].location_coords[0],
  //   lng: props.stops[1].location_coords[0].longitude,
  // };

  // console.log(props.stops[1].location_coords[0].latitude);

  // console.log(lat);

  // const center = {
  //   lat: {lat},
  //   lng: {lng},
  // };

  // console.log(center);

  // const center = {
  //   lat ,
  //   lng: props.stops[1].location_coords[0].longitude,
  // };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCqp3XhCNtt2GaQgDAhRvrjfO-A8zVQPWc",
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  // const [selected, setSelected] = React.useState(null);

  // const onMapClick = React.useCallback((e) => {
  //   setMarkers((current) => [
  //     ...current,
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);

  // useEffect(() => {
  //   const flightPlan = [

  //   ]

  //   const flight = new ({
  //     path: props.sto
  //   })
    
  //     props.stops.map((stop, i) => (
  //         key={stop.stop_name}
  //         position={{
  //           lat: stop.location_coords[0].lat,
  //           lng: stop.location_coords[0].lng,
  //         }}
  //     );
    
  // }, []);

  

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

  return (
    <div>
      {/* <Locate panTo={panTo} /> */}
      <SearchMap panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={{
          lat: props.stops[1].location_coords[0]?.lat,
          lng: props.stops[1].location_coords[0]?.lng,
        }}
        // center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {/* {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))} */}

        {props.stops.map((stop, i) => (
          <Marker
            key={stop.stop_name}
            position={{
              lat: stop.location_coords[0]?.lat,
              lng: stop.location_coords[0]?.lng,
            }}
          />
        ))}
        {/* 
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h5>Ticket needed?</h5>
            </div>
          </InfoWindow>
        ) : null} */}
      </GoogleMap>
    </div>
    // <div></div>
  );
}

export default MapPage;

// function MapPage(props) {
// const center = {
//   lat: 52.51862,
//   lng: 13.37618,
// };

// return (
//   <div>
//     <GoogleMap
//     defaultZoom={10}
//     defaultCenter={center}

//     >

//     </GoogleMap>
//   </div>

// )
// }

// export default MapPage;
