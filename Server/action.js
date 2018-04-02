export const CHANGE_CLIENT_STATE = 'CHANGE_CLIENT_STATE'
export const changeClientState = (x) => (
  {type: CHANGE_CLIENT_STATE, payload: {x}})
