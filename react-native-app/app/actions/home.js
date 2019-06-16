var {AsyncStorage} = require('react-native');
import { FETCH_MUSEUM_DATA,FETCH_PROFILE_DATA,FETCH_EXHIBITION_DATA,FETCH_CATEGORIES_DATA,FETCH_DISABILITIES_DATA } from './action_types';
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

export const fetchCategories = (data) => {
  return {
    type: FETCH_CATEGORIES_DATA,
    data
  }
};

export const fetchDisabilities = (data) => {
  return {
    type: FETCH_DISABILITIES_DATA,
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

export const fetchProfileData = (userId) => {
  return (dispatch) => {
    return axios.get('http://127.0.0.1:8080/api/v1/users/'+ userId)
      .then(response => {
        dispatch(fetchProfile(response.data))
        return response;
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const fetchCategoriesData = () => {
  return (dispatch) => {
    return axios.get("http://127.0.0.1:8080/api/v1/categories")
      .then(response => {
        dispatch(fetchCategories(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const fetchDisabilitiesData = () => {
  return (dispatch) => {
    return axios.get("http://127.0.0.1:8080/api/v1/disabilities")
      .then(response => {
        dispatch(fetchDisabilities(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

