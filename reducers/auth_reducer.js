import {SIGNED_IN} from '../constants/constants'


export default (state ={},action)=>{
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
