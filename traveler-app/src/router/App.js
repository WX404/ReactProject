import React from 'react';
import { Router, Route } from "react-router-dom";
import { createHashHistory } from "history";
import Home from "../views/Home.js";
import Discover from "../views/Discover.js";
import TravelNotes from "../views/TravelNotes.js";
import Friends from "../views/Friends.js";
import User from "../views/User.js"
import HotList from "../views/HotList.js";
import Login from "../components/Login.js";
import Register from "../components/Register.js";
// import Loadable from '../util/Loadable.js';

// const PersonalHomepage = Loadable(()=>import("../views/PersonalHomepage.js"))

const myHistory = createHashHistory();

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <Router history={myHistory}>
            <Route exact={true} path="/" component={Home} />
            <Route path="/discover" component={Discover} />
            <Route path="/travelnotes" component={TravelNotes} />
            <Route path="/friends" component={Friends} />
            <Route path="/user" component={User} />
            <Route path="/hotlist" component={HotList} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* <Route path="/user/userhomepage" component={PersonalHomepage} /> */}
          </Router>
      </div>
    );
  }
}

export default App;
