import {LOG_BOOK, SIGNED_IN} from "../constants/constants";
import {USER_LIST} from "../constants/Admin_Constants";


export function logBook (state ={},action){
    switch (action.type) {
        case LOG_BOOK:
            return Object.assign([],action.currentData);
        default:
            return state;
    }

}

export function userList(state={},action) {
    switch (action.type){
        case USER_LIST:
            return Object.assign([],action.data);
        default:
            return state;
    }
    
}