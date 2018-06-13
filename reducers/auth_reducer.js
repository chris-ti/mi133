import {SIGNED_IN, LOGIN_FAILURE, LOGOUT} from '../constants/constants'
import {bake_cookie,read_cookie} from "sfcookies"

let user ={
    username:'',
    password:''
};

export default (state={},action)=>{
    state = read_cookie("Authentication");
    switch (action.type){
        case SIGNED_IN:
            bake_cookie("Authentication",action.payload)
            return {userInfo:action.payload};
        case LOGIN_FAILURE:
            alert("Invalid Password");
            return {};
        case LOGOUT:
            bake_cookie("Authentication",{})
            return{};
        default:
            return state;
    }
}
