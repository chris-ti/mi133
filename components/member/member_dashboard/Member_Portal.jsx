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
                            <td>{data.boatName}
                            </td>
                            <td>{data.crew}
                            </td>
                            <td>{data.destination}
                            </td>
                            <td>
                                {data.departure.getDate()}-{data.departure.getMonth()}-{data.departure.getFullYear()},{data.departure.getHours()}:{data.departure.getMinutes()<10 ? "0"+data.departure.getMinutes(): data.departure.getMinutes()}
                            </td>
                            <td>
                                {data.arrival.getDate()}-{data.arrival.getMonth()}-{data.arrival.getFullYear()},{data.arrival.getHours()}:{data.arrival.getMinutes()<10 ? "0"+data.arrival.getMinutes(): data.arrival.getMinutes()}
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
