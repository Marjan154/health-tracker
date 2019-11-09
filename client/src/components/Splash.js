import React, {Component} from 'react';
import Login from './Login.js';
import Reg from './Register.js';
import Footer from './Footer.js';
import '../Styling/Splash.css';

class Splash extends Component{
  render(){
    return(
      <div className= "splash-page">
        <header className= "loginH">Health Tracker</header>
        
        <Login />
        <Reg />
        <Footer />
      </div>
    )
  }
}

export default Splash;