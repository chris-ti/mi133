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
    return dispatch=>{

    }
}

export function sendDestinationDetails(destination) {
    console.log(destination);
    return dispatch=>{

    }
}

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
        socket.on('change', () =>{
          axios.get(`/api/getLogbook`).then(res => {
              dispatch(dashboardDisplay(res.data));
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
    function subscribe(connected){return {type: "SUB", connected}}
}

//export function unsubscribeLogbook(socket) {
//    return dispatch => {
      //socket.emit('unsubscribe');
//      return dispatch(unsub());
//    }
//    function unsub() { return {type: "UNSUB" }}
//}
