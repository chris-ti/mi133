import React from 'react';
import "./Dashboard.css"
import { connect } from "react-redux"
import {browserHistory} from "react-router";
import Logbook from "./LogBook"
import {subscribeLogbook, unsubscribeLogbook} from "../../actions/Admin_actions";


class dashboard extends React.Component{


  //componentDidMount(){
  //    console.log('subscribe dashboard');
  //    this.props.subscribeLogbook();
  //}

  //componentWillUnmount() {
  //  console.log('unsubscribe dashboard');
  //  this.props.unsubscribeLogbook();
  //}

    render(){
        return <div>
            <div className={"container"}>
                <div className={"header"}>
                    <h1 className={"heading"}>Water Sports Logbook</h1>
                    <button className={"btn btn-primary loginButton"}onClick={ ()=>browserHistory.push('/login')}>Login</button>
                </div>
            </div>
            <div className={"logbook"}>
                <Logbook/>
            </div>
        </div>

    }

}

//const mapDispatchToProps = {
//    subscribeLogbook,
//    unsubscribeLogbook
//};

export default dashboard
