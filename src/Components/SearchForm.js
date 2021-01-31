import { useHistory } from "react-router-dom";

function SearchForm(props) {
  const history = useHistory();

  function onSubmit(event) {
    event.preventDefault();
    history.push("/results");
  }
  return (
    <section id="from-choose">
      <form
        className="form-inline"
        onSubmit={onSubmit}
        onChange={props.updateForm}
      >
        <div className="form-group">
          <select className="form-control" name="city">
            <option selected>Travelling To:</option>
            <option value="Berlin">Berlin</option>
            <option value="London">London</option>
            <option value="Tel-Aviv">Tel-Aviv</option>
            <option value="Paris">Paris</option>
            <option value="Amsterdam">Amsterdam</option>
          </select>
          <input
            type="text"
            className="form-control"
            name="start"
            placeholder="Check-in: 21/06/2020"
          />
          <input
            type="text"
            className="form-control"
            name="end"
            placeholder="Check-out: 21/07/2020"
          />
        </div>
        <button className="btn btn-primary" id="submit">
          Submit
        </button>
        <section id="trips-result"></section>
      </form>
    </section>
  );
}

export default SearchForm;
