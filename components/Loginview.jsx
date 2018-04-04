import React from 'react';
import { connect } from "react-redux"
import { logUser} from "../actions/sample_action";
import store from "../store/configureStore";

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
        dispatch(logUser(user));
    }
}
render(){
  return <div>This is the Loginview
  <br/><br/>
  <form>
  Username:
  <input type="text" name="username" onChange={event => this.setState({username:event.target.value})}></input><br/>
  Password:
  <input type="text" name="password" onChange={event => this.setState({password:event.target.value})}></input>
</form>
<button  onClick={()=>this.onSubmit()}>Login</button></div>
  }

}

function mapStateToProps(state) {
    console.log("current state:",state);
    return{state}
}

export default connect(mapStateToProps,null)(Loginview);
