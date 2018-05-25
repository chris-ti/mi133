import {LOG_BOOK, SIGNED_IN} from "../constants/constants";


export function logBook (state ={},action){
    switch (action.type) {
        case LOG_BOOK:
            return Object.assign([],action.currentData);
        default:
            return state;
    }

}