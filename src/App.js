import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Auth/Login";

import Home from "./components/Home";

function App() {
  return (
    <Router>
      {/* <div className="App">
        <Navbar />
      </div> */}
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
    </Router>
  );
}

export default App;
