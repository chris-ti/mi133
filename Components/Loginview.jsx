import React from 'react';
import {CHANGE_CLIENT_STATE} from '../Model/action'

export default class Loginview extends React.Component{

//onClick= {store.dispatch(changeClientState("loggedinMember"))}

render(){
  return <div>This is the Loginview
  <br/><br/>
  <form>
  Username:
  <input type="text" name="username"></input><br/>
  Password:
  <input type="text" name="password"></input>
</form>
<button  >Login</button></div>
  }

}
