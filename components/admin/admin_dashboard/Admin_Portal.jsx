import React from 'react';
import "./Admin_Portal.css"
import { connect } from "react-redux"
import {browserHistory} from "react-router";
import {loadingDashboard, logout, subscribeLogbook, unsubscribeLogbook} from "../../../actions/Admin_actions";
import Boat_Details from "./Boat_Details";
import Boat_Management from "./Boat_Management";
import Destination_Management from "./Destination_Management";
import LogBook from "../LogBook"

class dashboard extends React.Component{

    constructor(props){
      super(props);
    }

    signout(){
        this.props.logout();
    }

    componentDidMount(){
        this.props.loadingDashboard();
        console.log('subscribe admindashboard');
        console.log(this.props.socket);
        this.props.subscribeLogbook(this.props.socket);
    }

    //componentWillUnmount() {
    //  console.log('unsubscribe admindashboard');
    //  this.props.unsubscribeLogbook();
    //}

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



const mapStateToProps = ({logBook,socket,state}) => ({logBook,socket,state});

const mapDispatchToProps = {
    loadingDashboard,
    logout,
    subscribeLogbook,
    unsubscribeLogbook
};

export default  connect(mapStateToProps,mapDispatchToProps)(dashboard)
