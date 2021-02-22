
import Map from './Map';

function MapStops (props){
    return(
        <div>
            {props.stops.map((stop, i) =>(
                <Map stop={stop} />
            ))}
        </div>

    )
}