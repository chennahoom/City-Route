import {useEffect, useState } from "react";


function TourGuidTrip(props){
    const [tripData, setTripData] = useState(props.data);
    console.log(tripData);

    useEffect(() => {
        
        getTrip();
    }, []);

    const getTrip = () =>{
        fetch(`https://city-route.herokuapp.com/api/trips/${props.data}`)
        // fetch(`https://city-route.herokuapp.com/api/trips/${props.data}`)
          .then((res) => res.json())
          .then((body) => {
            setTripData(body);
            console.log(body);
            console.log(props.data);
          });
    }

    return(
        <div>
            <ul>
                {/* <li>trip id: {tripData.id}</li> */}
                <li>spaces left: {tripData.spaces_left === null? '0': tripData.spaces_left}</li>
                <li>start time: {tripData.start_time}</li>
                <li>trip name city: {tripData.trip_name_city}</li>
                <li>tour date: {tripData.tour_date}</li>
                <li>tour time: {tripData.tour_time}</li>
            </ul>
        </div>
    );

}

export default TourGuideTrip;
