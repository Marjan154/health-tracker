import React, {Component} from 'react';
import Login from './Login.js';
import Reg from './Register.js';
import Footer from './Footer.js';
import '../Styling/Splash.css';

class Splash extends Component{
  render(){
    return(
      <div className= "splash-page">
        <header className="py-1 bg-dark text-white" style={{top: 0, position: "absolute", width: "100%", fontSize: "2em"}}>
          <div className="container text-center">
            <span>Health Tracker</span>
          </div>
        </header>
        
        <div class="container">
          <div class="row">
            <div class="col-md-6" style= {{padding: "8%"}}>
              <Login />
            </div>
            <div class="col-md-6" style= {{padding: "8%"}}>
              <Reg />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Splash;