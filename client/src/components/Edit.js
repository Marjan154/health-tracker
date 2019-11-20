import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import Nav from './Nav.js';
import '../Styling/EditLog.css'
import 'react-datepicker/dist/react-datepicker.css';

export default class EditLog extends Component{
  constructor(props){
    super(props);
    this.state={
      item: '',
      amount: 0,
      water: 0,
      steps: 0,
      sleep: 0,
      startDate: new Date()
    }
  }

  onChangeItem= e =>{this.setState({item: e.target.value})};
  onChangeAmount= e =>{
    this.setState({amount: e.target.value});
    if(this.state.item === 'water'){
      this.setState({water: this.state.amount})
    }
    else if(this.state.item === 'steps'){
      this.setState({steps: this.state.amount})
    }
    else if(this.state.item === 'sleep'){
      this.setState({sleep: this.state.amount})
    }
  };

  handleChange = date =>{
    this.setState({startDate: date})
  };

  onSubmit(e) {
    e.preventDefault();
    window.location = '/home';
  }

  render(){
    return(
      <div className= "edit-log">
        <Nav />
        <h3 className= "text-center"style={{marginTop: "1%", fontSize: "2em"}}>Edit Health Log</h3>
        <form className="col-md-4 mb-3" style={{marginLeft: "auto", marginRight: "auto", marginTop: "2%"}} onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label style={{fontWeight: "bold"}}> Thing to Change: </label>
            <select ref="item" className="form-control form-control-lg" value={this.state.item} onChange={this.onChangeItem}>
              <option value= "water">Water</option>
              <option value= "sleep">Sleep</option>
              <option value= "steps">Steps</option>
            </select>
          </div>
          <div className="form-group">
            <label style={{fontWeight: "bold"}}>Amount: </label>
            <input 
                type="text" 
                className="form-control form-control-lg"
                value={this.state.amount}
                onChange={this.onChangeAmount}
                />
          </div>
          <div className="form-group">
            <span>Date: </span>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Health Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}