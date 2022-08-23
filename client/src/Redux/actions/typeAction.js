import { ADD_TYPE } from '../types';

const addType = (type) => (dispatch) => {
  dispatch({ type: ADD_TYPE, payload: type });
};

export default addType;
