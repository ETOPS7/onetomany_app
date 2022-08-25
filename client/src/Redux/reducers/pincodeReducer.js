import { CHECK_PINCODE, SET_TRUE_PINCODE } from '../types';

const pincodeReducer = (state = false, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHECK_PINCODE:
      return !state;
    // case SET_TRUE_PINCODE:
    //   return payload;
    default:
      return state;
  }
};

export default pincodeReducer;
