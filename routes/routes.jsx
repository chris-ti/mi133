import React from 'react'
import {Route} from 'react-router';
import Login from "../components/admin/login/Login";
import Public_Dashboard from "../components/admin/public_dashboard/Public_dashboard";
import Admin_Dashboard from "../components/admin/admin_dashboard/Admin_dashboard"
import User_Management from "../components/admin/admin_dashboard/User_Management";


export default (
    <Route>
        <Route path="/" component= {Public_Dashboard}/>
        <Route path="/login" component={Login}/>
        <Route path="/admin_dashboard" component={Admin_Dashboard}/>
        <Route path="/user_management" component={User_Management}/>
    </Route>
);
