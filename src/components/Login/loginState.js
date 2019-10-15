import { useReducer } from 'react';

// Define action types
const actionTypes = {
  SET_EMAIL: 'SET_EMAIL',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_ERROR: 'SET_ERROR',
};

// Intial state of login
const initialState = { email: '', password: '', error: '' };

function reducer(state, action) {
  // Only one of these will be defined, depending on the action type
  const { password, email, error } = action;
  switch (action.type) {
    case actionTypes.SET_EMAIL:
      return { ...state, email };
    case actionTypes.SET_PASSWORD:
      return { ...state, password };
    case actionTypes.SET_ERROR:
      return { ...state, error };
    default:
      return state;
  }
}

export const useLoginState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = {
    setError: error => dispatch({ type: actionTypes.SET_ERROR, error }),
    setEmail: email => dispatch({ type: actionTypes.SET_EMAIL, email }),
    setPassword: password =>
      dispatch({ type: actionTypes.SET_PASSWORD, password }),
  };
  return [state, actions];
};

export default useLoginState;
