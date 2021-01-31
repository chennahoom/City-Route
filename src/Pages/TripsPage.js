import SearchForm from "../Components/SearchForm";
import Trip from "../Components/Trip";

let trips = [
  { name: "Berlin", image: "https://i.postimg.cc/d3td1fFv/image.jpg" },
  { name: "London", image: "https://i.postimg.cc/85GL85n7/image.jpg" },
];

function TripsPage(props) {
  return (
    <div>
      <SearchForm updateForm={props.updateForm} />

      <section className="container">
        <h2 id="pageTitle">Where would you like to travel?</h2>

        <section className="row row-cols-1 row-cols-md-3">
          {trips.map((trip) => {
            return (
              <section className="col mb-4">
                <Trip trip={trip} key={trip.id} />
              </section>
            );
          })}
        </section>
      </section>
    </div>
  );
}

export default TripsPage;
