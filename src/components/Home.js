import React, { Component } from "react";
import Navbar from "./Navbar";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: {},
      addRow: false,
      tableData: JSON.parse(localStorage.getItem("table")) || [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, name) {
    const { formValues } = this.state;
    if (name) {
      // console.log("name", name);
      formValues[name] =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      this.setState({ formValues }, () => {
        // console.log("values", this.state.formValues);
      });
    } else {
      formValues.gender = e.target.value;
      this.setState({ formValues });
    }
  }

  addRow() {
    this.setState({ addRow: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { formValues, tableData } = this.state;
    let items = [...this.state.tableData];
    alert(
      `Name is ${formValues.firstName} ${formValues.lastName}and gender is ${formValues.gender} and DOB is ${formValues.date} and country is ${formValues.country} and user verified ${formValues.authenticate}`
    );
    items.push(formValues);
    localStorage.setItem("table", JSON.stringify(items));
    this.setState(
      {
        formValues: {
          firstName: "",
          lastName: "",
          date: "",
          country: "",
          gender: "",
          authenticate: "",
        },
        addRow: false,
        tableData,
      },
      () => {
        window.location.reload();
      }
    );
  }
  removeItem(data, i) {
    const { tableData } = this.state;
    tableData.splice(i, 1);
    localStorage.setItem("table", JSON.stringify(tableData));
    this.setState({
      tableData,
    });
  }

  render() {
    const { formValues, addRow, tableData } = this.state;
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="row">
            {addRow ? (
              <div className="col-6 offset-4">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formValues.firstName}
                      onChange={(e) => this.handleChange(e, "firstName")}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Lastname"
                      value={formValues.lastName}
                      onChange={(e) => this.handleChange(e, "lastName")}
                    />
                  </div>
                  <div className="form-group">
                    <label>select date</label>
                    <input
                      type="date"
                      name="bday"
                      max="3000-12-31"
                      min="1000-01-01"
                      className="form-control"
                      value={formValues.date}
                      onChange={(e) => this.handleChange(e, "date")}
                    />
                  </div>
                  <div className="form-group">
                    <label>select Country</label>
                    <select
                      className="form-control"
                      value={formValues.country}
                      onChange={(e) => this.handleChange(e, "country")}
                    >
                      <option value="">select country</option>
                      <option>India</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={formValues.authenticate}
                      onChange={(e) => this.handleChange(e, "authenticate")}
                    />
                    <label className="form-check-label">
                      Check user verified or not
                    </label>
                  </div>
                  <fieldset onChange={(e) => this.handleChange(e)}>
                    <div className="form-check mt-3 form-check-inline ">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="schedule-weekly-option"
                        value="male"
                        checked={formValues.gender === "male"}
                      />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="schedule-weekly-option"
                        value="female"
                        checked={formValues.gender === "female"}
                      />
                      <label className="form-check-label">Female</label>
                    </div>
                  </fieldset>

                  <button type="submit" className="btn btn-primary mt-3">
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary my-4"
                  onClick={() => this.addRow()}
                >
                  Add
                </button>

                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Country</th>
                      <th scope="col">Authenticated</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data, i) => {
                      return (
                        <tr key={i}>
                          <td>{data.firstName}</td>
                          <td>{data.lastName}</td>
                          <td>{data.country}</td>
                          <td>{data.authenticate ? "true" : "false"}</td>
                          <td>{data.gender}</td>
                          <td>{data.date}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger ml-4"
                              onClick={() => {
                                this.removeItem(data, i);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {tableData.length === 0 ? (
                      <td colspan="7" className='text-center'>No data found</td>
                    ) : null}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
