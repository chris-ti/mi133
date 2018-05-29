import React from 'react'
import {Route} from 'react-router';
import Login from "../components/admin/login/Login";
import Dashboard from "../components/admin/Dashboard";
import Admin_Portal from "../components/admin/admin_dashboard/Admin_Portal"
import Member_Portal from "../components/member/member_dashboard/Member_Portal"
import User_Management from "../components/admin/admin_dashboard/User_Management";


export default (
    <Route>
        <Route path="/" component= {Dashboard}/>
        <Route path="/login" component={Login}/>
        <Route path="/admin_dashboard" component={Admin_Portal}/>
        <Route path="/user_management" component={User_Management}/>
        <Route path="/member_dashboard" component={Member_Portal}/>
    </Route>
);
