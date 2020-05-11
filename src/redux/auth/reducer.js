import { SIGN_UP, SIGN_IN } from './types'

const initialState = {
  auth: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, signup: action.payload }
    case SIGN_IN:
      return { ...state, auth: action.payload }
    default:
      return state;
  }
}

export default authReducer;
