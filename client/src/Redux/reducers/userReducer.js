import { ADD_USER } from '../types';

const userReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_USER:
      console.log('userReducer', payload);
      return payload;

    default:
      return state;
  }
};

export default userReducer;
