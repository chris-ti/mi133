import React from 'react';
import "./Admin_Portal.css"
import { connect } from "react-redux"
import {browserHistory} from "react-router";
import {logout} from "../../../actions/Admin_actions";

class dashboard extends React.Component{

    signout(){
        this.props.logout();
    }

    render(){
        let logBook=Object.assign([],this.props.logBook);
        return <div className={"container"}>
            <div className={"adminheader"}>
                <h1 className={"adminHeading"}>ADMIN PORTAL</h1>

                <div className={"btn btn-danger adminSignout"} onClick={()=>this.signout()}>Sign out</div>
                <div className={"btn btn-primary usermanagementbutton"} onClick={()=>browserHistory.push('/user_management')}>User Management</div>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return{state}
}

const mapDispatchToProps = {
    logout
};

export default  connect(mapStateToProps,mapDispatchToProps)(dashboard)
