
import { FETCH_MUSEUM_DATA } from './action_types';
import axios from 'axios';

export const fetchMuseum = (data) => {
  return {
    type: FETCH_MUSEUM_DATA,
    data
  }
};

export const fetchMuseumData = () => {
  return (dispatch) => {
    return axios.get("http://127.0.0.1:8080/api/v1/museums")
      .then(response => {
        dispatch(fetchMuseum(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const fetchD = (data) => {
  return {
    type: FETCH_GITHUB_DATA,
    data
  }
};

export const fetchGithubData = () => {
  return (dispatch) => {
    return axios.get("http://127.0.0.1:8080/api/v1/museums")
      .then(response => {
        dispatch(fetchData(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};



