// import { useState, useEffect } from "react";

// import React from "react";
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
//   Polyline,
// } from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";

// import SearchMap from "./SearchMap";

// const libraries = ["places"];
// const mapContainerStyle = {
//   width: "700px",
//   height: "500px",
// };
// const options = {
//   //   styles: mapStyles,
//   disableDefaultUI: false,
//   zoomControl: true,
// };

// function MapTG(props) {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyCqp3XhCNtt2GaQgDAhRvrjfO-A8zVQPWc",
//     libraries,
//   });

//   const [markers, setMarkers] = useState([]);

//   const mapRef = React.useRef();
//   const onMapLoad = React.useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   const panTo = React.useCallback(({ lat, lng }) => {
//     mapRef.current.panTo({ lat, lng });
//     mapRef.current.setZoom(14);
//   }, []);

//   if (loadError) return "Error";
//   if (!isLoaded) return "Loading...";

//   if (!props.stops.length) return "loading...";

//   return (
//     <div>
//       <SearchMap panTo={panTo} />

//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={14}
//         center={{
//           lat: props.stops[0].location_coords[0]?.lat,
//           lng: props.stops[0].location_coords[0]?.lng,
//         }}
//         options={options}
//         onLoad={onMapLoad}
//       >
//         {props.stops.map((stop, i) => (
//           <Marker
//             key={stop.stop_name}
//             position={{
//               lat: stop.location_coords[0]?.lat,
//               lng: stop.location_coords[0]?.lng,
//             }}
//           />
//         ))}
//       </GoogleMap>
//     </div>
//   );
// }

// export default MapTG;

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

const libraries = ["places"];
const mapContainerStyle = {
  width: "700px",
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

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log("error");
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

function MapTG(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCqp3XhCNtt2GaQgDAhRvrjfO-A8zVQPWc",
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

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
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

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
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default MapTG;
