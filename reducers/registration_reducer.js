import { userConstants } from '../constants/constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
        alert("Failed to register");
      return {};
    default:
      return state
  }
}