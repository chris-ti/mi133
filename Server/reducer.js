import {CHANGE_CLIENT_STATE} from './action'

const initialstate = "notLoggedin"

export default function reducer(state = initialstate, action) {
  console.log("reducer fired");
  return state;
}
