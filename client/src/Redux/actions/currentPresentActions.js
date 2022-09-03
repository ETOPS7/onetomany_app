import axios from 'axios';
import {
  ADD_PRESENT,
  SET_TRUE_PINCODE,
  CHANGE_STATE,
  CHECK_PINCODE,
} from '../types';

const port = process.env.REACT_APP_SERVER_PATH || 'http://localhost:3001';

export const presentAdd = (input) => (dispatch) => {
  axios
    .post(`${port}/api/admin/${input.type}`, input)
    .then((res) => {
      dispatch({
        type: ADD_PRESENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log('err'));
};

export const presentAddState = (input) => (dispatch) => {
  axios
    .post(`${port}/api/admin/${input.type}`, input)
    .then((res) => {
      dispatch({
        type: ADD_PRESENT,
        payload: res.data,
      });
      dispatch({
        type: CHANGE_STATE,
      });
    })
    .catch((err) => console.log('err'));
};

export const checkPincode = (input, setError) => (dispatch) => {
  axios
    .post(`${port}/api/admin/checkpincode`, input)
    .then((res) => {
      dispatch({
        type: ADD_PRESENT,
        payload: res.data,
      });
      dispatch({
        type: CHECK_PINCODE,
      });
    })
    .catch((err) => {
      setError(true);
      console.log('Ошибка в ручке проверки pincode');
    });
};

export const onePresSlice = (value) => (dispatch) => {
  dispatch({
    type: ADD_PRESENT,
    payload: value,
  });
  dispatch({
    type: CHANGE_STATE,
  });
};
