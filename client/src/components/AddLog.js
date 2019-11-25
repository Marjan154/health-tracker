import React, {Component} from 'react';
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
      startDate: new Date()
    }
  }

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

  onChangeItem= e =>{this.setState({item: e.target.value})};
  onChangeAmount= e =>{
    this.setState({amount: e.target.value, water: this.state.amount});
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
        <div className= "text-center"style={{marginTop: "1%", fontSize: "2em"}}>
          <h3>Add to Water Log</h3>
          <h3>Today's Date: {this.getDate()}</h3>
        </div>
        <form className="col-md-4 mb-3" style={{marginLeft: "auto", marginRight: "auto", marginTop: "2%"}} onSubmit={this.onSubmit}>
          <div className="form-group">
            <label style={{fontWeight: "bold"}}>Amount (oz): </label>
            <input 
                type="text" 
                className="form-control form-control-lg"
                value={this.state.amount}
                onChange={this.onChangeAmount}
                />
          </div>
          
          <div className="form-group">
            <input type="submit" value="Add to Water Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}