import axios from 'axios';
import { ADD_PRESENT, DELETE_PRESENT, PRESENTS_FOR_USER } from '../types';

const port = process.env.REACT_APP_SERVER_PATH || 'http://localhost:3001';

export const presentAdd = (value) => ({
  type: ADD_PRESENT,
  payload: value,
});
// для axios нужно передать тип презентации и ее id
export const deletePresent = (payload) => (dispatch) => {
  axios.delete(`${port}/api/admin/${payload.template}/${payload.id}`)
    .then((res) => dispatch({ type: DELETE_PRESENT, payload }))
    .catch((err) => console.log('err'));
};

export const allPresent = () => (dispatch) => {
  axios(`${port}/api/admin/presents`)
    .then((res) => dispatch({ type: PRESENTS_FOR_USER, payload: res.data }))
    .catch((err) => console.log('err'));
};

// export default allPresent;
