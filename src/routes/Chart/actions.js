import { GET_DATA, CLEAR_DATA } from './actionTypes';
import { request } from '../../utils/request';

export const getData = () => {
  const apiUrl = '/charts';
  return {
    type: GET_DATA,
    payload: request({ url: apiUrl }),
  };
};

export const clearData = () => ({
  type: CLEAR_DATA,
  payload: null,
});
