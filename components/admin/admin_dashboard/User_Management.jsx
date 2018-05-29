import React,{Component} from "react";
import RegisterPage from "./RegisterPage";
import './Admin_Portal.css'
import {browserHistory} from "react-router";

class UserManagement extends Component{
    render(){
        return(<div>
            <div className={"usermanagement-title"}>
                <div>
                    <button className={"btn btn-primary dashboardButtonForUM"}onClick={ ()=>browserHistory.push('/admin_dashboard')}>DashBoard</button>
                </div>
                <h1>USER MANAGEMENT</h1>
            </div>
            <div className={"container"}>
                <div className={"registerPage"}><RegisterPage/></div>
            </div>

        </div>)
    }

}
export default UserManagement