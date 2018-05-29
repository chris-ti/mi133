import React from 'react';
import "./Admin_dashboard.css"
import { connect } from "react-redux"
import {browserHistory} from "react-router";
import {loadingDashboard} from "../../../actions/Admin_actions";

class dashboard extends React.Component{

    render(){
        let logBook=Object.assign([],this.props.logBook);
        return <div className={"container"}>
            <div className={"header"}>
                <h1 className={"adminHeading"}>ADMIN PORTAL</h1>
                <button className={"btn btn-primary loginButton"}onClick={ ()=>browserHistory.push('/user_management')}>User Management</button>
            </div>
        </div>
    }
}

export default dashboard
