import React, { Component } from "react";
import login from "../../images/download.png";
import swal from "sweetalert";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
      auth: JSON.parse(localStorage.getItem("login")) || {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  loginValidation() {
    const { email, password, errors } = this.state;
    const passwordre = new RegExp("^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
    const emailReg = new RegExp("!/^[^s@]+@[^s@]+.[^s@]+$/");
    let formIsValid = true;
    if (!email) {
      formIsValid = false;
      errors.email = "*Please enter email.";
    } else if (emailReg.test(email)) {
      formIsValid = false;
      errors.email = "*Invalid email format.";
    }
    if (!password || passwordre.test(password)) {
      formIsValid = false;
      errors.password = "*Please enter strong password.";
    }
    this.setState({
      errors,
    });
    return formIsValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (this.loginValidation()) {
      // let items = [...auth];
      // items.push({
      //   password: this.state.password,
      //   email: this.state.email,
      // });
      let items = {
        password: password,
        email: email,
      };
      localStorage.setItem("login", JSON.stringify(items));
      setTimeout(() => {
        swal({
          text: "success",
          icon: "success",
          timer: 1000,
        });
        // window.location.reload();
      });
      this.setState({
        password: "",
        email: "",
      });
      this.props.history.push("/home");
    } else {
      alert("Not Working");
    }
  }

  render() {
    const { errors, password, email } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row my-5">
            <div className="col-8 mt-5">
              <img src={login} height="500" alt="login" />
            </div>

            <div className="col-4 my-auto">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label >Email address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    id="exampleInputEmail1"
                    onChange={(e) => this.handleChange(e, "email")}
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                  />
                  <p className="text-danger">{errors.email}</p>
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    className="form-control"
                    onChange={this.handleChange}
                    placeholder="Password"
                  />
                  <p className="text-danger">{errors.password}</p>
                  <p className="text-danger">
                    {/* {this.state.message && this.state.message} */}
                  </p>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    title="Submit"
                    className="btn btn-primary btn-block"
                    disabled={!email || !password}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
