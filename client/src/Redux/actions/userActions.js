import axios from 'axios';
import { ADD_USER } from '../types';

const port = process.env.REACT_APP_SERVER_PATH || 'http://localhost:3001';

export const userAdd = (value) => ({
  type: ADD_USER,
  payload: value,
});

export const userSignUp = (input) => (dispatch) => {
  axios
    .post(`${port}/api/user/signup`, input)
    .then((res) => dispatch(userAdd(res.data)))
    .catch((err) => console.log('err'));
};

export const userCheck = () => (dispatch) => {
  axios
    .post(`${port}/api/user/check`)
    .then((res) => {
      dispatch(userAdd(res.data));
    })
    .catch((err) => {
      dispatch(userAdd({})); // define association here
    });
};

export const signInUser = (input, setError) => (dispatch) => {
  axios
    .post(`${port}/api/user/signin`, input)
    .then((res) => {
      dispatch(userAdd(res.data));
    })
    .catch((err) => {
      console.log('err');
      setError(false);
    });
};

export const logoutUser = () => (dispatch) => {
  axios(`${port}/api/user/logout`)
    .then((res) => {
      // dispatch({ type: PRESENTS_FOR_USER, payload: [] });
      dispatch(userAdd({}));
    })
    .catch((err) => console.log('err'));
};
