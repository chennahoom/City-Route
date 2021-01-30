import { useHistory  } from "react-router-dom";
import AddTrip from './AddTrip';

function TourGuideMenu (props){
    const history = useHistory();

    const add = () =>{
        history.push("/addTrip");
    }

    const addTrip = () =>{
        
    }


    return(
        <div>
            {/* <AddTrip /> */}
            <button onClick={add}>Add Trip</button>
            <button>View All Trips</button>
        </div>
    )
}

export default TourGuideMenu;