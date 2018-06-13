import {LOG_BOOK, SIGNED_IN, LOGIN_FAILURE, REGISTER_SUCCESS, LOGOUT, REGISTER_FAILURE} from "../constants/constants";
import axios from "axios/index";
import {browserHistory} from "react-router";
import {REMOVE_USER, USER_LIST,BOAT_DESTINATION_LIST} from "../constants/Admin_Constants";



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

export function loadAllBoatAndDestinationDetails() {
    const boatData=[];
    const destinationData=[];
    const data={
        boatData,
        destinationData
    };
    boatData.push({_id:"1",boatName:"boat1",maxCrew:'10',available: true});
    boatData.push({_id:"2",boatName:"boat2",maxCrew:'10',available:true});
    boatData.push({_id:"3",boatName:"boat3",maxCrew:'10',available:false});
    destinationData.push({_id:"1",destination:'dest1',travelTime:'1'});
    destinationData.push({_id:"2",destination:'dest2',travelTime:'2'})
    return dispatch=>{
        dispatch(loadReceivedBoatAndDestinationData(data))
    }

    function loadReceivedBoatAndDestinationData(data) {
        return{ type: BOAT_DESTINATION_LIST , data};
    }
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
    };
    function dashboardDisplay(currentData) { return { type: "LOG_BOOK", currentData } }
}

