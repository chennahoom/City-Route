import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <section className="navbar navbar-light bg-light">
        <a href="trips.html">
          <img
            className="nav-logo"
            alt="logo"
            src="https://i.postimg.cc/L4Y4Dm4L/Logo2.png"
          />
        </a>
        <span className="headtext">Where to next?</span>
        <section className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="/"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              className="profile"
              alt="profile"
              src=""
            />
          </Link>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/login">
              Log out
            </Link>
          </div>
        </section>
      </section>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href=""
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Trips
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" href="trips.html">
                  Find a trip
                </a>
                <a className="dropdown-item" href="article.html">
                  My trips
                </a>
              </div>
            </div>
            <a className="nav-item nav-link" href="#">
              Recommendations
            </a>
            <a className="nav-item nav-link" href="#">
              Settings
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
