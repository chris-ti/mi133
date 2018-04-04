import { createStore } from "redux"
import reducer from "../reducers/auth_reducer"

const store = createStore(reducer);

export default store;