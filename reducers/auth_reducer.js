import {SIGNED_IN,LOGIN_FAILURE} from '../constants/constants'


export default (state ={},action)=>{
    switch (action.type){
        case SIGNED_IN:
            const { username,password }=action;
            console.log(username,password)
            let user ={
                username,password
            }
            return user;
        case LOGIN_FAILURE:
            alert("Invalid Password");
            return {};
        default:
            return state;
    }
}
