import { ADD_WORD, GET_WORDS } from '../types';

const wordsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_WORD:
      return [...state, payload];
    case GET_WORDS:
      return payload;
    default:
      return state;
  }
};

export default wordsReducer;
