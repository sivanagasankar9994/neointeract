import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    let token = JSON.parse(localStorage.getItem("login"));
    this.setState({
      token,
    });
  }

  logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("login");
      this.props.history.push("/");
      // window.location.reload();
    }
  };

  render() {
    const { token } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h4 className="navbar-brand">Navbar</h4>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNavDropdown" className="navbar-collapse collapse">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav">
              <>
                {token && token ? (
                  <>
                    <Link to='/'>
                      <li className="nav-item" onClick={() => this.logOut()}>
                        <p className="nav-link">Logout</p>
                      </li>
                    </Link>

                    <p className="mt-2 text-success">{token && token.email}</p>
                  </>
                ) : (
                  ""
                )}
              </>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Navbar);
