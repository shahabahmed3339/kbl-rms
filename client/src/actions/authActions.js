import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "../store";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Log Maintain
      const name = decoded.name;
      const role = decoded.role;
      const Log1 = {
        Log: `${role} ${name} logged in at ${Date()}`
      }
      console.log(Log1)
      axios.post('http://localhost:5000/Logs/add' , Log1)
        .then(res => console.log(res.data));
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Log Maintain
  const name = store.getState().auth.user.name;
  const role = store.getState().auth.user.role;
  const Log1 = {
    Log: `${role} ${name} logged out at ${Date()}`
  }
  console.log(Log1)
  axios.post('http://localhost:5000/Logs/add' , Log1)
    .then(res => console.log(res.data));
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
