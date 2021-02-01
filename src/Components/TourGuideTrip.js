import {useEffect, useState } from "react";


<<<<<<< HEAD:src/Components/TourGuidTrip.js
function TourGuidTrip(props){
    const [tripData, setTripData] = useState('');
=======
function TourGuideTrip(props){
    const [tripData, setTripData] = useState(props.data);
    console.log(tripData);
>>>>>>> 919b7aec22ac9811be8e17829d0ed22c49b65f10:src/Components/TourGuideTrip.js

    useEffect(() => {
        fetch(`https://city-route.herokuapp.com/api/trips/${props.data}`)
            .then((res) => res.json())
            .then((body) => {
            setTripData(body);
            console.log(body);
            console.log(props.data);
            });
    }, []);
    

    return(
        <div>
            <ul>
                {/* <li>trip id: {tripData.id}</li> */}
                <li>spaces left: {tripData.spaces_left}</li>
                <li>start time: {tripData.start_time}</li>
                <li>trip name city: {tripData.trip_name_city}</li>
                <li>tour date: {tripData.tour_date}</li>
                <li>tour time: {tripData.tour_time}</li>
            </ul>
        </div>
    );

}

export default TourGuideTrip;
