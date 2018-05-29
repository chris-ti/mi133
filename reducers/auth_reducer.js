import {SIGNED_IN, LOGIN_FAILURE, LOGOUT} from '../constants/constants'

let user ={
    username:'',
    password:''
};

export default (state ={},action)=>{
    switch (action.type){
        case SIGNED_IN:
            const { username,password }=action;
            console.log(username,password);
            user.username=username;
            user.password=password;
            return user;
        case LOGIN_FAILURE:
            alert("Invalid Password");
            return {};
        case LOGOUT:
            return{};
        default:
            return state;
    }
}
