import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import Nav from './Nav.js';
import Graph from './graph.js';
import '../Styling/Home.css';
import 'react-datepicker/dist/react-datepicker.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state= {
      water: 0,
      startDate: new Date()
    }
  };

  componentDidMount(){
    this.setState({date: new Date()})
  };

  handleChange = date =>{
    this.setState({startDate: date})
  };

  getDate(){
    var tempDate = this.state.startDate;
    var date;
    if(tempDate.getDate() < 10){
      date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-0' + tempDate.getDate();
    }
    else{
      date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
    }
    return(<span>{date}</span>)
  };

  //need to add the :id to home url
  render(){
    return(
      <div className= "home-page">
        <Nav />
        <div style= {{textAlign: "center"}}>
          <span>Choose Date: </span>
          <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
        </div>
        <h3 className= "text-dark" style={{fontSize: "3em", marginTop: "1%", textAlign: "center"}}>{this.getDate()}</h3>
        <div className="d-flex justify-content-center" style={{marginTop: "1.5%"}}>
          <div className="card-deck text-center" style={{width: "50em", height: "10em"}}>
            <div className="card" style={{boxShadow: "10px 10px 5px grey"}}>
              <div className="card-body">
                <h5 className="card-title">Water Intake</h5>
                <table className= "table">
                  <thead className= "thead-light">
                    <tr>
                      <th>Water</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td>{this.state.water}</td>
                    <td>{this.getDate()}</td>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop: "25%", width: "35em", boxShadow: "10px 10px 5px grey", marginLeft: "auto", marginRight: "auto"}}>
          <Graph/>
        </div>
      </div>
    )
  }
};

export default Home;