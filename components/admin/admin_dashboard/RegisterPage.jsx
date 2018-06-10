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
            user: {
                name: '',
                username: '',
                password: '',
                role: ''
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.name && user.username && user.password && user.role) {
            dispatch(sendRegisterDetails(this.state));
        }
    }
    render() {
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register User</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                        <label htmlFor="name"> Full Name</label>
                        <input type="text" className="form-control register" name="name" value={user.name} onChange={this.handleChange} />
                        {submitted && !user.name &&
                        <div className="help-block"> Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control register" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                        <div className="help-block">username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control register" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.role ? ' has-error' : '')}>
                        <label htmlFor="password">Role</label>
                        <select  className="form-control register" name="role" value={user.role} onChange={this.handleChange}>
                            <option></option>
                            <option value={"ADMIN"}>Admin</option>
                            <option value={"MEMBER"}>User</option>
                        </select>
                        {submitted && !user.role &&
                        <div className="help-block">Role is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/Admin_dashboard" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return{state}
}

export default connect(mapStateToProps,null )(RegisterPage)