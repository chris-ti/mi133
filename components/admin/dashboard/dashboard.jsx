import React from 'react';
import "./dashboard.css"
import { connect } from "react-redux"
import {browserHistory} from "react-router";
import {loadingDashboard} from "../../../actions/Admin_actions";

class dashboard extends React.Component{

    componentDidMount(){
        this.props.loadingDashboard();
    }

    render(){
        let logBook=Object.assign([],this.props.logBook);
        return <div className={"container"}>
            <div className={"header"}>
                <h1 className={"heading"}>Water Sports Logbook</h1>
                <button className={"btn btn-primary loginButton"}onClick={ ()=>browserHistory.push('/login')}>Login</button>
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
    loadingDashboard
};

const mapStateToProps = ({logBook}) => ({logBook});

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)
