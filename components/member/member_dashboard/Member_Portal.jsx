import React from 'react';
import "./Member_Portal.css"
import { connect } from "react-redux"
import {browserHistory} from "react-router";
import {loadingDashboard,logout} from "../../../actions/Admin_actions";
import CreateTrip from "./CreateTrip";
import LogBook from "../../admin/LogBook"

class dashboard extends React.Component{

    componentDidMount(){
        this.props.loadingDashboard();
    }

    signout(){
        this.props.logout();
    }

    render(){
        let logBook=Object.assign([],this.props.logBook);
        return <div className={"memberContainer"}>
            <div className={"memberHeader"}>
                <h1 className={"memberHeading"}>USER PORTAL</h1>
                <div className={"btn btn-danger userSignout"} onClick={()=>this.signout()}>Sign out</div>
            </div>
            <div className={"tripContainer"}>
                <div className={"logbookMember"}>
                    <LogBook/>
                </div>
                <div className={"createTrip"}>
                    <CreateTrip/>
                </div>
            </div>

        </div>
    }

}

const mapDispatchToProps = {
    loadingDashboard,
    logout
};

const mapStateToProps = ({logBook}) => ({logBook});

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)
