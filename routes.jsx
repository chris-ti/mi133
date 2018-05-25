import React from 'react'
import {Route} from 'react-router';
import Login from "./components/admin/login/Login";
import Admin_Dashboard from "./components/admin/dashboard/dashboard";

export default (
    <Route>
        <Route path="/" component= {Admin_Dashboard}/>
        <Route path="/login" component={Login}/>
    </Route>
);
