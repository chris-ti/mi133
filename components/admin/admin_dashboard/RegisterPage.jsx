import React from 'react';
import "./Admin_Portal.css"
import { connect } from "react-redux"
import Link from "react-router/es/Link";
import {browserHistory} from "react-router";
import {sendRegisterDetails} from "../../../actions/Admin_actions";


class RegisterPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            email: '',
            role: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        const {dispatch}=this.props;
        dispatch(sendRegisterDetails(this.state));
    }

    render() {
        //Validation needs to be implemented

        return <div className="col-md-6 col-md-offset-3">
                <h2>Register User</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <label htmlFor="firstname"> First Name</label>
                    <input type="text" className="form-control register" name="first_name"
                           onChange={event => this.setState({first_name: event.target.value})}/>


                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" className="form-control register" name="last_name"
                           onChange={event => this.setState({last_name: event.target.value})}/>


                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control register" name="email"
                           onChange={event => this.setState({email: event.target.value})}/>


                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control register" name="username"
                           onChange={event => this.setState({username: event.target.value})}/>


                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control register" name="password"
                           onChange={event => this.setState({password: event.target.value})}/>

                        <label htmlFor="password">Role</label>
                        <select type="password" className="form-control register" name="role"  onChange={event =>{this.setState({role: event.target.value })}}>
                            <option></option>
                            <option value={"ADMIN"}>Admin</option>
                            <option value={"MEMBER"}>Member</option>
                        </select>

                    <div className="form-group">
                        <br/>
                        <button className="btn btn-primary">Register</button>
                        <Link to="/admin_dashboard" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>

    }
}




function mapStateToProps(state) {
    return{state}
}

export default connect(mapStateToProps,null )(RegisterPage)