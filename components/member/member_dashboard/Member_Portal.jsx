import React from 'react';
import "./Member_Portal.css"
import { connect } from "react-redux"
import {browserHistory} from "react-router";
import {loadingDashboard,logout} from "../../../actions/Admin_actions";

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

            <div className={"logbook"}>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Boat</th>
                        <th scope="col">Crew</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Departure</th>
                        <th scope="col">Arrival</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logBook.map(data=>{
                        return <tr key={data.id}>
                          <td>{data.boat.boatName}
                          </td>
                          <td>{ data.boat.crewName}
                          </td>
                          <td>{data.destination.destination}
                          </td>
                          <td>
                              {new Date(data.departure).getDate()}-{new Date(data.departure).getMonth()}-{new Date(data.departure).getFullYear()},{new Date(data.departure).getHours()}:{new Date(data.departure).getMinutes() < 10 ? ('0' + new Date(data.departure).getMinutes()) : new Date(data.departure).getMinutes()}
                          </td>
                          <td>
                              {new Date(data.arrival).getDate()}-{new Date(data.arrival).getMonth()}-{new Date(data.arrival).getFullYear()},{new Date(data.arrival).getHours()}:{new Date(data.arrival).getMinutes() < 10 ? ('0' + new Date(data.arrival).getMinutes()) : new Date(data.arrival).getMinutes()}
                          </td>
                        </tr>
                    })}
                    </tbody>
                </table>
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
