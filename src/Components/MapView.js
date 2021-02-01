import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "../App.css";

function MapView(props) {
  console.log(props.stops);


  // let long = props.stops[0].location_coords[0];
  // let lat = props.stops[0].location_coords[1];

  // console.log(long);
  // console.log(lat);

  return (
    <MapContainer
      className="leaflet-container"
      center={[0,0]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {props.stops.map((stop, i) => (
        <Marker
          key={stop.stop_name}
          position={[stop.location_coords[0], stop.location_coords[1]]}
        ></Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
