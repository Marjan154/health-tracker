import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  constructor(){
    super();
    this.state= {
      email: '',
      password: '',
      hidden: true,
      redirect: false
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleShow= this.toggleShow.bind(this);
  }
  
  onChangeEmail= (event)=> {
    this.setState({email: event.target.value})
  };

  onChangePass= (event)=> {
    this.setState({password: event.target.value});
  }

  toggleShow(){
    this.setState({hidden: !this.state.hidden});
  }

  onSubmit= (event)=> {
    event.preventDefault();
    //needs to check with backend
    alert("Succesfully Logged In");
    this.setState({redirect: true});
  }

  //need to add the :id part
  render(){
    if(this.state.redirect){
      return(
        <Redirect to= "/home" />
      )
    }

    return(
      <div className="container login-container" style= {{marginTop: "5%", marginBottom: "5%"}}>
        <form onSubmit={this.onSubmit}>
          <h3 style={{textAlign: "center", marginBottom: "5%"}}>Log In</h3>
          <div className= "form-group">  
            <label style={{fontWeight: "bold"}} for= "email1">Email:</label>
            <input className="form-control" type= "text" required id= "email1" value= {this.state.email} onChange= {this.onChangeEmail} />
          </div>
          <div className= "form-group">
            <label style={{fontWeight: "bold"}} for= "pw">Password:</label>
            <input className="form-control" type= {this.state.hidden ? "password": "text"} required id= "pw" value= {this.state.password} onChange= {this.onChangePass} />
          </div>
          <div className= "form-group">
            <input className="btn btn-secondary btn-sm" type="button" onClick= {this.toggleShow} value= "Show/Hide Password"/>
          </div>
          <div className= "form-group text-center">
            <input className="btn btn-primary btn-lg" type="submit" value= "Log In" />
          </div>
        </form>
      </div>
    )
  };

}

export default Login;

/* 
*** Email validation check, omitted for now
<input className="form-control" type= "email" required id= "email1" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}" value= {this.state.email} onChange= {this.onChangeEmail} />

*** Password validation check, omitted for now
<input className="form-control" type= {this.state.hidden ? "password": "text"} required id= "pw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value= {this.state.password} onChange= {this.onChangePass} />
*/