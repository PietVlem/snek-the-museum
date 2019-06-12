
import { FETCH_MUSEUM_DATA,FETCH_PROFILE_DATA,FETCH_EXHIBITION_DATA } from './action_types';
import axios from 'axios';

export const fetchMuseum = (data) => {
  return {
    type: FETCH_MUSEUM_DATA,
    data
  }
};

export const fetchProfile = (data) => {
  return {
    type: FETCH_PROFILE_DATA,
    data
  }
};

export const fetchExhibition = (data) => {
  return {
    type: FETCH_EXHIBITION_DATA,
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

export const fetchExhibitionData = () => {
  return (dispatch) => {
    return axios.get("http://127.0.0.1:8080/api/v1/exhibitions")
      .then(response => {
        dispatch(fetchExhibition(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
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