import React from 'react';
import "./Admin_Portal.css"
import { connect } from "react-redux"
import {browserHistory} from "react-router";
import {loadingDashboard, logout} from "../../../actions/Admin_actions";
import Boat_Details from "./Boat_Details";
import Boat_Management from "./Boat_Management";
import Destination_Management from "./Destination_Management";
import LogBook from "../LogBook"

class dashboard extends React.Component{

    signout(){
        this.props.logout();
    }
    componentDidMount(){
        this.props.loadingDashboard();
    }

    render(){
        let logBook=Object.assign([],this.props.logBook);
        return <div >
            <div className={"container"}>
                <div className={"adminheader"}>
                    <h1 className={"adminHeading"}>ADMIN PORTAL</h1>

                    <div className={"btn btn-danger adminSignout"} onClick={()=>this.signout()}>Sign out</div>
                    <div className={"btn btn-primary usermanagementbutton"} onClick={()=>browserHistory.push('/user_management')}>User Management</div>

                </div>
            </div>
            <div className={"StatusContainer"}>
                <div className={"logbookAdmin"}>
                    <h2 className={"statusHeader"}>LOGBOOK</h2>
                    <LogBook/>
                    <div>
                        <Boat_Details/>
                    </div>
                </div>
                <div className={"managementContainer"}>
                    <h2 style={{textAlign: 'center'}}>MANAGEMENT</h2>
                    <div className={"boatManagement"}>
                        <Boat_Management/>
                    </div>
                    <div className={"destinationManagement"}>
                        <Destination_Management/>
                    </div>
                </div>
            </div>

        </div>
    }
}



const mapStateToProps = ({logBook,state}) => ({logBook,state});

const mapDispatchToProps = {
    loadingDashboard,
    logout
};

export default  connect(mapStateToProps,mapDispatchToProps)(dashboard)
