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
import America from "../components/America.js";
import Han from "../components/Han.js";
import Tai from "../components/Tai.js";
import Tu from "../components/Tu.js";

import PersonalHomepage from "../views/PersonalHomepage.js";

import Setup from "../components/Setup.js";
import Material from "../components/Material";
import singleImg from "../components/singleImg.js";

const myHistory = createHashHistory(); //这个必须写在所有import的后面

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
            <Route path="/personalhomepage/:uid" component={PersonalHomepage} />
            <Route path="/setup/:uid" component={Setup} />
            <Route path="/material" component={Material} />
            <Route path="/singleImg/:pid" component={singleImg} /> 
            <Route path="/america" component={America} />
            <Route path="/han" component={Han} />
            <Route path="/tai" component={Tai} />
            <Route path="/tu" component={Tu} />           
          </Router>
      </div>
    );
  }
}

export default App;
