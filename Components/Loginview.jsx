import React from 'react';

export default class Loginview extends React.Component{


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
