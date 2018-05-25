import {LOG_BOOK, SIGNED_IN} from "../constants/constants";

let boat={
    id:"",
    boatName:"",
    crew:[],
    destination:"",
    departure:"",
    arrival:""
}

export function logUser(user) {
    const { username,password }=user;
    const action={
        type: SIGNED_IN,username,password
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