import CardMap from '../Components/CardMap';

import {useParams} from 'react-router-dom'

function MapPage(props) {	
   const params = useParams();
   console.log(params)
   return(
      <CardMap tripId={params.tripId} updateTrips={props.updateTrips}/>
   ) 
}

export default MapPage;
