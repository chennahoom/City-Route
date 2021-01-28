import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


function CardMap(props) {
    const [results, setResults] = useState([]);
    const [tourGuide, setTourGuide] = useState([]);
    const[tickets, setTickets] = useState({});
    const[trip, setTrip] = useState("");


    useEffect(() => {
        // run after render
        fetch(`https://city-route.herokuapp.com/api/trips/${props.tripId}`)
            .then(res => res.json())
            .then(body => {
                setResults(body);
            });

        fetch(`https://city-route.herokuapp.com/api/users/${results.tour_guide_id}`)
            .then(res => res.json())
            .then(body => {
                setTourGuide(body);
            });
    }, []);

    const updateSpace = (info) =>{
        fetch(`https://city-route.herokuapp.com/api/trips/${props.tripId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(info),
            })
        .then(response => response.json())
        .then(info => { 
            // props.updateTrips(info);
            setTrip(info);
            props.updateTrips(info);
        })
    }


    const numOfTic = () =>{
        // TODO:need to check id Traveler
        console.log(tickets);
        if(results.spaces_left >= tickets){
            const info = {
                spaces_left: parseInt(results.spaces_left) - parseInt(tickets),
            }
            updateSpace(info);
        }
        else{
            //TODO: add here the num of the tour guide
        }

    }

    const handleTick = (event) => {
		setTickets(event.target.value);
    }

    return (
        <div className="card-map">
            <div id="mapid"></div>
            <div className="card-body">
                <h5 className="card-title" id="tour-city">City: {results.trip_name_city}</h5>
                <h3 className="card-title" id="tour-guide">Tour Guide: {tourGuide.full_name}</h3>
                <p className="card-text" id="trip-stops">Stops: {results.stops}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item" id="tourDate">Tour Date: {results.tour_date}</li>
                <li className="list-group-item" id="tourTime">Tour Time: {results.tour_time}</li>
                <li className="list-group-item" id="startTime">Start time: {results.start_time}</li>
                <li className="list-group-item" id="spacesLeft">Spaces Left: {results.spaces_left}</li>
            </ul>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Join Trip
            </button>
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Join Trip</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="join-trip">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">How many spaces do you want to save?
                            <div className="form-group">
                                <label for="spaces">Example select</label>
                                <select id="spaces" onChange={handleTick}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <p id="ticketsError"></p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                        <Link to={`/article`}>

                            <button type="button" className="btn btn-primary" id="save-tickets" onClick={numOfTic}>
                                Save Changes
                            </button>

                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardMap;
