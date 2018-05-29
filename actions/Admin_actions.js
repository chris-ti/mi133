import {LOG_BOOK, SIGNED_IN, LOGIN_FAILURE} from "../constants/constants";
import axios from "axios/index";
import {browserHistory} from "react-router";

let boat={
    id:"",
    boatName:"",
    crew:[],
    destination:"",
    departure:"",
    arrival:""
}


export function sendLoginDetails(user) {
    const {username, password} = user;
    return dispatch => {
        axios.post('http://localhost:4200/logbook/login', {username, password})
            .then(res => {
                if (res.status === 200) {
                    browserHistory.push('/admin_dashboard');
                } else {
                    alert("Login Failed");
                }
                console.log(res.data);
                dispatch(logUser(username, password));
            },
                function (error) {
                    dispatch(failure(error))
                });
    };
    function failure(error) { return { type: LOGIN_FAILURE} }
}



export function sendRegisterDetails(user) {
    axios.post('http://localhost:4200/logbook/registerUser', user)
        .then(res => console.log(res.data));
    return dispatch => {
        dispatch(registerUser(user));
    }
}


export function logUser(username,password) {
    const action={
        type: SIGNED_IN,username,password
    }
    return action;
}

export function registerUser(user) {
    const action={
        type: REGISTER_SUCCESS,user
    }
    return action;
}

export function loadingDashboard() {
    const data=[];
    //TBD
    //API call for actual data from backend

    data.push({id:"1",boatName:"boat1",crew:["crew1","crew2"],destination:"dest1",departure:new Date(),arrival:new Date()});
    data.push({id:"2",boatName:"boat2",crew:["crew1","crew2"],destination:"dest2",departure:new Date(),arrival:new Date()});
    data.push({id:"3",boatName:"boat3",crew:["crew1","crew2"],destination:"dest1",departure:new Date(),arrival:new Date()});
    data.push({id:"4",boatName:"boat4",crew:["crew1","crew2"],destination:"dest3",departure:new Date(),arrival:new Date()});
    data.push({id:"5",boatName:"boat5",crew:["crew1","crew2"],destination:"dest1",departure:new Date(),arrival:new Date()});
    return dispatch => {
        dispatch(dashboardDisplay(data));
    }

}

function dashboardDisplay(currentData) {
    return { type: "LOG_BOOK", currentData }
}