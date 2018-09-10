import {LOG_BOOK, REGISTER_FAILURE, REGISTER_SUCCESS, SIGNED_IN, SUB} from "../constants/constants";
import {REMOVE_USER, USER_LIST,BOAT_DESTINATION_LIST} from "../constants/Admin_Constants";


export function socket(state ={},action){
  let connected = false;
  switch (action.type) {
      case SUB:
      connected = action.connected;
      return connected;
      default:
          return state;
  }
}

export function logBook (state ={},action){
    switch (action.type) {
        case LOG_BOOK:
        return Object.assign([],action.currentData);
        default:
            return state;
    }

}

const refreshAfterDelete=(state,id)=>{
    state=state.filter(user=> user._id!==id)
    console.log(state)
    return state;
}

export function userList(state={},action) {
    let list = [];
    switch (action.type){
        case USER_LIST:
            list = Object.assign([],action.data);
            return list
        case REMOVE_USER:
            list = refreshAfterDelete(state,action.userId);
            return list;
        case REGISTER_SUCCESS:
            list = [...state,action.user]
            return list;
        case REGISTER_FAILURE:
            alert('Registration Failed');
        default:
            return state;
    }

}

export function boatAndDestList(state={},action) {
    let list = [];
    switch (action.type){
        case BOAT_DESTINATION_LIST:
            list = Object.assign([],action.data); //changed from {}
            return list
        case REMOVE_USER:
            list = refreshAfterDelete(state,action.userId);
            return list;
        case REGISTER_SUCCESS:
            list = [...state,action.user]
            return list;
        case REGISTER_FAILURE:
            alert('Registration Failed');
        default:
            return state;
    }

}
