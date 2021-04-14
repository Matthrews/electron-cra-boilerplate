import { GET_DATA, CLEAR_DATA } from './actionTypes';

const chartReducer = (state = {}, action) => {
  switch (action.type) {
    case `${GET_DATA}_FULFILLED`: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case `${CLEAR_DATA}`: {
      return {
        ...state,
        data: {},
      };
    }
    default:
      return state;
  }
};


export default chartReducer
