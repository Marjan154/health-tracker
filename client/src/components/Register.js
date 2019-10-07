import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../Styling/Login.css';

class Reg extends Component {
  constructor(){
    super();
    this.state= {
      user: {
        username: '',
        password: ''
      },
      redirect: false
    }
  }
  
  handleChange= (event)=> {
    const updatedUser= {...this.state.user}
    const inputField= event.target.name
    const inputValue= event.target.value
    updatedUser[inputField]= inputValue
    this.setState({user: updatedUser})
  };

  handleClick= (event)=> {
    event.preventDefault();

    //Needs to be better
    if((this.state.user.username !== '' && this.state.user.password !== ''))
    {
      alert("Succesfully Registered");
      this.setState({redirect: true});
    }
    else{
      alert("Error");
    };
  }

  render(){
    if(this.state.redirect){
      return(
        <Redirect to= "/home" />
      )
    }

    return(
      <div className= "entire-box">
        <p className= "title">Sign In</p>
        <form className= "formL">
          <label for= "un">Username:</label>
          <input id= "un" name= "username" type= "text" value= {this.state.user.username} onChange= {this.handleChange} />
          <label for= "pw">Password:</label>
          <input id= "pw" name= "password" type= "password" value= {this.state.user.password} onChange= {this.handleChange} />
          <br />
          <button id= "reg" onClick= {this.handleClick}>Register</button>
        </form>
      </div>
    )
  };

}

export default Reg;
