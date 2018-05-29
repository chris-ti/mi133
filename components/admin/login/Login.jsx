import React from 'react';
import { connect } from "react-redux"
import { sendLoginDetails} from "../../../actions/Admin_actions";
import "./Login.css"
import axios from "axios/index";
import store from "../../../store/configureStore";
import {browserHistory} from "react-router";

class Loginview extends React.Component{
constructor(props){
    super(props);
    this.state={
        username:"",
        password:""
    }
}

onSubmit(){
    const { username, password } = this.state;
    if (username && password) {
        let user = {
            "username": username,
            "password": password
        }
        const {dispatch}=this.props;
        dispatch(sendLoginDetails(user));
       }
   /*const data= {id:"1",boatName:"boat1",crew:["crew1","crew2"],destination:"dest1",departure:new Date(),arrival:new Date()}
    axios.post('http://localhost:4200/logbook/add', data)
        .then(res => console.log(res.data));*/

}
render(){
  return<div className={"loginContainer"}>
      <div>
          <button className={"btn btn-primary dashboardButton"}onClick={ ()=>browserHistory.push('/')}>DashBoard</button>
      </div>
      <div align="center" className={"login"}>
          <div align="left" className="col-md-6 col-md-offset-3 ">
              <h2> Login</h2>
              <form>
                  Username:
                  <input type="text" className="form-control" name="username" onChange={event => this.setState({username:event.target.value})} ></input><br/>
                  Password:
                  <input type="text" className="form-control" name="password" onChange={event => this.setState({password:event.target.value})} ></input>
              </form>
              <br></br>
              <button  onClick={()=>this.onSubmit()}>Login</button>
          </div>
      </div>
      </div>
  }

}

function mapStateToProps(state) {
    return{state}
}

export default connect(mapStateToProps,null)(Loginview);
