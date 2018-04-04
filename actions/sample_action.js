import { SIGNED_IN} from "../constants/sample_constant";

export function logUser(user) {
    const { username,password }=user;
    const action={
        type: SIGNED_IN,username,password
    }
    return action;
}