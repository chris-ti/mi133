import React from 'react';
import "./Admin_Portal.css"
import { connect } from "react-redux"
import {sendBoatRegisterDetails} from "../../../actions/Admin_actions";

class Boat_Management extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            boat: {
                boatName: '',
                maxCrew: ''
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { boat } = this.state;
        this.setState({
            boat: {
                ...boat,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { boat } = this.state;
        const { dispatch } = this.props;
        if (boat.boatName && boat.maxCrew ) {
            dispatch(sendBoatRegisterDetails(this.state));
        }
    }



    render() {
        const { boat, submitted } = this.state;
        return (
            <div>

                <div className={"createBoat"}>
                    <h3>Register Boat</h3>
                    <div className="col-md-6 col-md-offset-3" style={{maxWidth: '85%'}}>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !boat.boatName ? ' has-error' : '')}>
                                <label htmlFor="boatName">Boat Name</label>
                                <input type="text" className="form-control register" name="boatName" value={boat.boatName} onChange={this.handleChange} />
                                {submitted && !boat.boatName &&
                                <div className="help-block"> Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !boat.maxCrew ? ' has-error' : '')}>
                                <label htmlFor="maxCrew">Maximum Crew</label>
                                <select  className="form-control register" name="maxCrew" value={boat.maxCrew} onChange={this.handleChange}>
                                    <option></option>
                                    <option value={"10"}>10</option>
                                    <option value={"20"}>20</option>
                                    <option value={"30"}>30</option>
                                    <option value={"40"}>40</option>
                                </select>
                                {submitted && !boat.maxCrew &&
                                <div className="help-block">Field is required</div>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    return{state}
}


export default  connect(mapStateToProps,null )(Boat_Management)