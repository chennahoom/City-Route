import { React, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";

import "../App.css";

function MapView(props) {
  console.log(props.stops);
  // console.log(props.stops[0].location_coords[0]);

  // console.log(props.stops[0].location_coords[0].latitude);
  // console.log(props.stops[0].location_coords[0].longitude);

  // console.log(props.stops[1].location_coords[0].latitude);

  //const polyline = props.stops[0].location_coords[0];

  //const redOptions = { color: "red" };

  // console.log(props.stops.location_coords[0], props.stops.location_coords[1])

  return (
    <MapContainer
      className="leaflet-container"
      center={[52.3609, 4.88516]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {props.stops.map((stop, i) => (
        <Marker
          key={stop.stop_name}
          position={[
            stop.location_coords[0].latitude,
            stop.location_coords[0].longitude,
          ]}
        >
          {/* <Polyline pathOptions={redOptions} positions={polyline}></Polyline> */}
          <Popup
            position={[
              stop.location_coords[0].latitude,
              stop.location_coords[0].longitude,
            ]}
          >
            <div>
              <h6>{stop.stop_name}</h6>
              <p>{"Is a ticket needed? " + stop.is_ticket_needed}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    // <div></div>
  );
}
export default MapView;
