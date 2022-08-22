import axios from 'axios';
import { ADD_PRESENT, CHANGE_STATE } from '../types';

const port = process.env.REACT_APP_SERVER_PATH || 'http://localhost:3001';

export const presentAdd = (input) => (dispatch) => {
  axios.post(`${port}/api/admin/${input.type}`, input)
    .then((res) => {
      console.log('presentAdd actions --->', res.data);
      dispatch({
        type: ADD_PRESENT,
        payload: res.data,
      });
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

// export const s = '';
// export const s = '';
