import axios from 'axios';
import { ADD_PRESENT, SET_TRUE_PINCODE, CHANGE_STATE, CHECK_PINCODE } from '../types';

const port = process.env.REACT_APP_SERVER_PATH || 'http://localhost:3001';

export const presentAdd = (input) => (dispatch) => {
  axios.post(`${port}/api/admin/${input.type}`, input)
    .then((res) => {
      // console.log('presentAdd actions --->', res.data);
      // dispatch({
      //   type: ADD_PRESENT,
      //   payload: res.data,
      // });
    })
    .catch((err) => console.log('err'));
};

export const presentAddState = (input) => (dispatch) => {
  axios.post(`${port}/api/admin/${input.type}`, input)
    .then((res) => {
      console.log('presentAdd actions --->', res.data);
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

export const checkPincode = (input) => (dispatch) => {
  axios.post(`${port}/api/admin/checkpincode`, input)
    .then((res) => {
      // console.log('checkPincode -- res.data --->', res.data);
      dispatch({
        type: ADD_PRESENT,
        payload: res.data,
      });
      dispatch({
        type: SET_TRUE_PINCODE,
        payload: true,
      });
    })
    .catch((err) => console.log('Ошибка в ручке проверки pincode'));
};

// export const s = '';
// export const s = '';
