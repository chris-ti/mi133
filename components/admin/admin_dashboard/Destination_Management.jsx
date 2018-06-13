import React from 'react';
import "./Admin_Portal.css"
import { connect } from "react-redux"
import Link from "react-router/es/Link";
import {sendDestinationDetails} from "../../../actions/Admin_actions";

class Destination_Management extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            destination: {
                destination: '',
                travelTime: 0
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { destination } = this.state;
        this.setState({
            destination: {
                ...destination,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { destination } = this.state;
        const { dispatch } = this.props;
        if (destination.destination && destination.travelTime ) {
            dispatch(sendDestinationDetails(this.state));
        }
    }



    render() {
        const { destination, submitted } = this.state;
        return (
            <div>
                <div className={"createDestination"}>
                    <h3>Register Destination</h3>
                    <div className="col-md-6 col-md-offset-3" style={{maxWidth: '75%'}}>
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !destination.destination ? ' has-error' : '')}>
                                <label htmlFor="boatName">Destination</label>
                                <input type="text" className="form-control register" name="destination" value={destination.destination} onChange={this.handleChange} />
                                {submitted && !destination.destination &&
                                <div className="help-block"> Name is required</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !destination.travelTime ? ' has-error' : '')}>
                                <label htmlFor="maxCrew">Travel Time</label>
                                <select  className="form-control register" name="travelTime" value={destination.travelTime} onChange={this.handleChange}>
                                    <option></option>
                                    <option value={1}>1 Hr</option>
                                    <option value={2}>2 Hr</option>
                                    <option value={3}>3 Hr</option>
                                </select>
                                {submitted && !destination.travelTime &&
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

export default  connect(mapStateToProps,null )(Destination_Management)