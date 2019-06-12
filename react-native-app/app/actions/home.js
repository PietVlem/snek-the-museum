
import { FETCH_MUSEUM_DATA,FETCH_PROFILE_DATA } from './action_types';
import axios from 'axios';

export const fetchMuseum = (Museum) => {
  return {
    type: FETCH_MUSEUM_DATA,
    Museum
  }
};

export const fetchMuseumData = () => {
  return (dispatch) => {
    return axios.get("http://127.0.0.1:8080/api/v1/museums")
      .then(response => {
        dispatch(fetchMuseum(response.Museum))
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const fetchProfile = (data) => {
  return {
    type: FETCH_PROFILE_DATA,
    data
  }
};

export const fetchProfileData = () => {
  return (dispatch) => {
    return axios.get("http://127.0.0.1:8080/api/v1/users/5cfa14b19ff7a77ae56b4457")
      .then(response => {
        dispatch(fetchProfile(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};



