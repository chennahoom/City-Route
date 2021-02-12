import {useEffect, useState } from "react";


function TourGuideTrip(props){
    const [tripData, setTripData] = useState(props.data);

    useEffect(() => {
        fetch(`https://city-route.herokuapp.com/api/trips/${props.data}`)
            .then((res) => res.json())
            .then((body) => {
                if(body){
                    setTripData(body);  
                }
            console.log(body);
            console.log(props.data);
        });
    }, []);
    
    const handleDelete = () =>{
        // console.log(props.data.id);
        console.log(props.data);
        props.deleteTrip(props.data);
    }

    const initForm = {
        trip_name_city: "",
        tour_date: "",
        tour_guide_id: props.user?.id,
        tour_time: "",
        start_time: "",
        ticketsBought: 0, 
      };
    const [dupTripData, setDupTripData] = useState();


    const handleDuplicate = () =>{
        // TODO: not working 100%, need to ask the user about date to duplicat
        // TODO: not working 100%, need to ask the user about date to duplicat
        fetch(`https://city-route.herokuapp.com/api/trips/${props.data}`)
        .then((res) => res.json())
        .then((body) => {
            setDupTripData({trip_name_city: body.trip_name_city, tour_date: '12/11/2023', tour_guide_id: body.tour_guide_id, tour_time: body.tour_time, start_time: body.start_time, ticketsBought: 0}) 
            console.log(body.start_time);   

        });
        props.addTrip(dupTripData);
        console.log(dupTripData);

    }

    return(
        <div>
            <ul>
                {/* <li>trip id: {tripData.id}</li> */}
                <li>tickets bought: {tripData?.ticketsBought}</li>
                <li>start time: {tripData?.start_time}</li>
                <li>trip name city: {tripData?.trip_name_city}</li>
                <li>tour date: {tripData?.tour_date}</li>
                <li>tour time: {tripData?.tour_time}</li>
                <button onClick={() => props.onDuplicate(tripData)}>Duplicate</button>
                <button>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </ul>
        </div>
    );

}

export default TourGuideTrip;
