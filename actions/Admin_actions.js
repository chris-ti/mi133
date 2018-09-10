import {LOG_BOOK, SIGNED_IN, LOGIN_FAILURE, REGISTER_SUCCESS, LOGOUT, REGISTER_FAILURE, UNSUB} from "../constants/constants";
import axios from "axios/index";
import {browserHistory} from "react-router";
import {REMOVE_USER, USER_LIST,BOAT_DESTINATION_LIST} from "../constants/Admin_Constants";
import io from 'socket.io-client';

//Properties
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
    function logUser(payload) { return { type: SIGNED_IN,payload };  }
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
    function registerUser(user) { const action={ type: REGISTER_SUCCESS,user }; return action; }
}

export function sendBoatRegisterDetails(boat) {
    console.log(boat);
    axios.post('/api/registerBoat', boat)
        .then(res =>
            dispatch(registerBoat(res.data))
        ),function (error) {
                dispatch(registerBoatFailure(error))
            }
}
function registerBoat(data) {return {type: REGISTER_SUCCESS_BOAT, boat}}
function registerBoatFailure(error){ return { REGISTER_FAILURE_BOAT}}
//TBD

export function sendDestinationDetails(destination) {
    console.log(destination);
    axios.post('/api/registerDestination', destination)
        .then(res =>
            dispatch(registerDestination(res.data))
        ),function (error) {
                dispatch(registerFailure(error))
                }
}
function registerDestination(destination){ return {type: REGISTER_DESTINATION_SUCCESS, destination}}
function registerDestFailure(error){ return {type: REGISTER_FAILURE_DESTINATION}}
//TBD Constants are unused

export function loadingBoats() {
    return dispatch => {
        axios.get(`/api/getBoats`).then(res => {
            dispatch(loadReceivedBoats(res.data));
        });
    };
    function loadReceivedBoats(currentData) { return { type: "BOAT_LIST", currentData } }

}

export function loadingDestinations() {
    return dispatch => {
        axios.get(`/api/getDestinations`).then(res => {
            dispatch(loadReceivedDestinations(res.data));
        });
    };
    function loadReceivedDestinations(currentData) { return { type: "DEST_LIST", currentData } }

}

export function loadAllUsers(){
    return dispatch => {
        axios.get('/api/getAllUsers').then(res => {
               dispatch(loadReceivedUser(res.data))
            });
    }
    function loadReceivedUser(data) { return{ type: USER_LIST , data}; }
}



export function deleteUserAction(_id) {
    return dispatch => {
        axios.delete(`/api/deleteUser/${_id}`).then(res => {
            console.log(res.data);
            dispatch(updateDeletedUser(_id))
        });
    };
    function updateDeletedUser(userId) { return {type: REMOVE_USER , userId }; }
}

export function deleteBoatAction(_id) {
    return dispatch=>{
        axios.delete(`/api/deleteBoat/${_id}`).then(res => {
          console.log(res.data);
          dispatcht(deleteBoat);
        })
    }
    function deleteBoat(boatId){return {type: REMOVE_BOAT, boatId}; }
}

export function deleteDestinationAction(_id) {
    return dispatch=>{
      axios.delete(`/api/deleteDestination/${_id}`).then(res => {
        console.log(res.data);
        dispatcht(deleteDestination);
      })
    }
    function deleteDestination(destId){return {type: REMOVE_DEST, destId}; }
}


export function loadingDashboard() {
    return dispatch => {
        axios.get(`/api/getLogbook`).then(res => {
            dispatch(dashboardDisplay(res.data));
        });
    };
    function dashboardDisplay(currentData) { return { type: "LOG_BOOK", currentData } }

}


export function subscribeLogbook(connected) {
    return dispatch => {
      if(connected){
        const socket = io('http://localhost:4200');
        socket.on('changeLogbook', () =>{
          axios.get('/api/getLogbook').then(res => {
              dispatch(dashboardDisplay(res.data));
          });
        });
        socket.on('changeBoat', () =>{
          axios.get('/api/getBoats').then(res => {
              dispatch(loadReceivedBoats(res.data));
          });
        });
        socket.on('changeDestination', () =>{
          axios.get('/api/getDestinations').then(res => {
              dispatch(loadReceivedDestinations(res.data));
          });
        });
        socket.on('changeUser', () =>{
          axios.get('/api/getAllUsers').then(res => {
              dispatch(loadReceivedUser(res.data));
          });
        });
        connected = false;
        dispatch(subscribe(connected));
      }
      else{
        return {type: "UNSUB"};
      }

    };
    function dashboardDisplay(currentData) { return { type: "LOG_BOOK", currentData } }
    function loadReceivedBoats(currentData) { return { type: "BOAT_LIST", currentData } }
    function loadReceivedDestinations(currentData) { return { type: "DEST_LIST", currentData } }
    function loadReceivedUser(data) { return{ type: USER_LIST , data}; }
    function subscribe(connected){return {type: "SUB", connected}}
}
