const initialState = [
  { 
    user: null,
    token: localStorage.getItem('token'),
  }
] 

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'LOGIN':
      return { user: action.user, token: action.token }
    case 'LOGOUT':
      return { user: null, token: '' }
    default: // if none of the above matches, code comes here
    return state
  }
}

export const login = (user, token) => {
  return {
    type: 'LOGIN',
    user: user,
    token: token
  }
}

export default authReducer;

