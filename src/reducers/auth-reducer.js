const initialState = [
  { 
    user: null,
    token: localStorage.getItem('token'),
  }
] 

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LOGIN':
      return state 
    case 'LOGOUT':
      return state 
    default: // if none of the above matches, code comes here
    return state
  }
}

export default authReducer;

