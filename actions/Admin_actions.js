import {LOG_BOOK, SIGNED_IN, LOGIN_FAILURE, REGISTER_SUCCESS, LOGOUT, REGISTER_FAILURE} from "../constants/constants";
import axios from "axios/index";
import {browserHistory} from "react-router";
import {REMOVE_USER, USER_LIST} from "../constants/Admin_Constants";

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
        axios.post('/api/auth/login', {username, password})
            .then(res => {
                if (res.status === 200) {
                    if(res.data.role ==="ADMIN"){
                        browserHistory.push('/admin_dashboard');
                    }else{
                        browserHistory.push('/member_dashboard');
                    }
                }
                dispatch(logUser(res.data));
            },
                function (error) {
                    dispatch(failure(error))
                });
    };
    function failure(error) { return { type: LOGIN_FAILURE} }
}

export function logout(){
    return dispatch=>{
        dispatch(logoutUser());
        browserHistory.push('/');
    }
    function logoutUser() {  return { type: LOGOUT } }
}

export function sendRegisterDetails(user) {

    return dispatch => {
        axios.post('/api/auth/registerUser', user)
            .then(res =>
                dispatch(registerUser(res.data))
            ),function (error) {
                    dispatch(registerFailure(error))
                }

    };
    function registerFailure(error) { return { type: REGISTER_FAILURE} }
}


function logUser(payload) {
    const action={
        type: SIGNED_IN,payload
    }
    return action;
}

function registerUser(user) {
    const action={
        type: REGISTER_SUCCESS,user
    }
    return action;
}


export function loadAllUsers(){
    return dispatch => {
        axios.get('/api/getAllUsers').then(res => {
            console.log(res.data)
               dispatch(loadReceivedUser(res.data))
            });
    }
}

function loadReceivedUser(data) {
    return{ type: USER_LIST , data};
}

export function deleteUserAction(_id) {
    return dispatch => {
        axios.delete(`/api/deleteUser/${_id}`).then(res => {
            console.log(res.data);
            dispatch(updateDeletedUser(_id))
        });
    }
}

function updateDeletedUser(userId) {
    return {type: REMOVE_USER , userId };
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