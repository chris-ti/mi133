import React from 'react';
import "./Dashboard.css"
import { connect } from "react-redux"
import {browserHistory} from "react-router";
import Logbook from "./LogBook"

class dashboard extends React.Component{


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

export default dashboard
