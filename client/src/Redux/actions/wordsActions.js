import axios from 'axios';
import { ADD_WORD, GET_WORDS, SET_WORDS } from '../types';

const port = process.env.REACT_APP_SERVER_PATH || 'http://localhost:3001';

export const getWords = () => ({
  type: GET_WORDS,
});

export const settWords = (payload) => ({
  type: SET_WORDS,
  payload
});

// export const showWords = (value) => (dispatch) => {
//   axios(`${port}/api/admin/${value.type}/${value.id}`)
//     .then((res) => {
//       dispatch({ type: GET_WORDS, payload: res.data });
//     })
//     .catch(
//       (err) => console.log('err')
//     );
// };

export const addWord = (payload) => (dispatch) => {
  axios.post(`${port}/api/admin/word`, payload)
    .then((res) => {
      dispatch({ type: ADD_WORD, payload });
    })
    .catch(
      (err) => console.log('err')
    );
};

export const s = '';
