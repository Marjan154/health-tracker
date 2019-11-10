import React, {Component} from 'react';
import Footer from './Footer.js'
import '../Styling/Home.css';
import Graph from './graph.js'

class Home extends Component {
  render(){
    return(
      <div>
        <header className= "homeH">
          <div className= "headerL">
            <a>Logo?</a>
          </div>
          <div className= "headerR">
            <a>About?</a>
          </div>
        </header>

        <section>Section 1</section>
        <Graph></Graph>
        <Footer />
      </div>
    )
  }
};

export default Home;