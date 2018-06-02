import {SIGNED_IN, LOGIN_FAILURE, LOGOUT} from '../constants/constants'

let user ={
    username:'',
    password:''
};

export default (state={},action)=>{
    switch (action.type){
        case SIGNED_IN:
            return {...state,userInfo:action.payload};
        case LOGIN_FAILURE:
            alert("Invalid Password");
            return {};
        case LOGOUT:
            return{};
        default:
            return state;
    }
}
