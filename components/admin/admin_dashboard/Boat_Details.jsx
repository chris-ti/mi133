import React from 'react';
import "./Admin_Portal.css"
import { connect } from "react-redux"
import {loadingDestinations,loadingBoats} from "../../../actions/Admin_actions";

class Boat_Details extends React.Component {

    componentDidMount(){
        this.props.loadingDestinations()
        this.props.loadingBoats()
    }

    render() {
        const boat = Object.assign([],this.props.boatList);
        const destination = Object.assign([],this.props.destList);

        console.log(boat);
        return (
            <div className={"containerBoat"}>
            <h2 className={'BoatDetailsHeader'} >INFORMATION</h2>
                <div className={"tableBoat"}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th className="col" style={{width:'95px'}} >Boat</th>
                            <th className="col" style={{width:'95px'}} >Max</th>
                            <th className="col" style={{width:'95px'}}>Availability</th>
                            <th className="col" style={{width:'95px'}}>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {boat.map(data=>{
                            return <tr key={data._id}>
                                <td>{data.boatName}
                                </td>
                                <td>{data.maxCrew}
                                </td>
                                <td>{data.available? "Yes" : "No"}
                                </td>
                                <td>
                                    <button className={"btn btn-danger "}  >Remove</button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
                <div className={"tableDestination"}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col" style={{width:'126px'}} >Destinations</th>
                            <th scope="col" style={{width:'126px'}} >Time</th>
                            <th className="col" style={{width:'126px'}}>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {destination.map(data=>{
                            return <tr key={data._id}>
                                <td>{data.destination}
                                </td>
                                <td>{data.travelTime} Hr
                                </td>
                                <td>
                                    <button className={"btn btn-danger "}  >Remove</button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>

        </div>)


    }
}
const mapStateToProps = ({boatList,destList}) => ({boatList,destList});

const mapDispatchToProps = {
    loadingBoats,
    loadingDestinations
};

export default  connect(mapStateToProps,mapDispatchToProps )(Boat_Details)
