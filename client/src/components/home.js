import React, {Component} from 'react';
import Nav from './Nav.js';
import Footer from './Footer.js';
import '../Styling/Home.css';
import Graph from './graph.js'

class Home extends Component {
  constructor(){
    super();
    this.state= {
      water: 0,
      steps: 0,
      sleep: 0,
    }
  }
  //need to add the :id to home url
  render(){
    return(
      <div className= "home-page">
        <Nav />
        <div className="d-flex justify-content-center" style={{marginTop: "2%"}}>
          <div className="card-deck text-center" style={{width: "50em", height: "10em"}}>
            <div className="card" style={{boxShadow: "10px 10px 5px grey"}}>
              <div className="card-body">
                <h5 className="card-title">Water Intake</h5>
                <p className="card-text"><small class="text-muted">{this.state.water}</small></p>
              </div>
            </div>
            <div className="card" style={{boxShadow: "10px 10px 5px grey"}}>
              <div className="card-body">
                <h5 className="card-title">Steps Taken</h5>
                <p className="card-text"><small class="text-muted">{this.state.steps}</small></p>
              </div>
            </div>
            <div className="card" style={{boxShadow: "10px 10px 5px grey"}}>
              <div className="card-body">
                <h5 className="card-title">Hours Slept</h5>
                <p className="card-text"><small className="text-muted">{this.state.sleep}</small></p>
              </div>
            </div>
          </div>
        </div>

        <section>Section 1</section>
        <Graph></Graph>
        <Footer />
      </div>
    )
  }
};

export default Home;