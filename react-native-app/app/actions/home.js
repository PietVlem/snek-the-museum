
import { FETCH_GITHUB_DATA } from './action_types';
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8080/api/v1/museums';

export const fetchData = (data) => {
  return {
    type: FETCH_GITHUB_DATA,
    data
  }
};

export const fetchGithubData = () => {
  return (dispatch) => {
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchData(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};