import {SIGNED_IN} from '../constants/sample_constant'

let user={
    username:null,
    password:null
}

export default (state =user,action)=>{
    switch (action.type){
        case SIGNED_IN:
            const { username,password }=action;
            user ={
                username,password
            }
            return user;
        default:
            return state;
    }
}
