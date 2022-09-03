import axios from 'axios';
import {
  ADD_WORD, CHANGE_STATE, GET_WORDS, SET_WORDS
} from '../types';

const port = process.env.REACT_APP_SERVER_PATH || 'http://localhost:3001';

export const getWords = () => ({
  type: GET_WORDS,
});

export const settWords = (payload) => ({
  type: SET_WORDS,
  payload
});

export const addWord = (payload) => (dispatch) => {
  axios.post(`${port}/api/admin/word`, payload)
    .then((res) => {
      dispatch({ type: ADD_WORD, payload });
      dispatch({
        type: CHANGE_STATE,
      });
    })
    .catch(
      (err) => console.log('err')
    );
};

export const s = '';
