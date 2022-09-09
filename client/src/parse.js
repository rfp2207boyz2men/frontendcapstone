import axios from 'axios';
import CONFIG from '../../config.js';

let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/';

let authorization = { headers: { Authorization: CONFIG.API_KEY } };

const Parse = {
  getAll: (endpoint, params = '') => {
    return axios.get(`${url}${endpoint}${params}`, authorization)
  },

  create: (endpoint, params = '', data) => {
    return axios.post(`${url}${endpoint}${params}`, data, authorization)
  },

  upload: (url, data) => {
    return axios.post(url, data)
  },

  update: (endpoint, params = '', data = {}) => {
    return axios.put(`${url}${endpoint}${params}`, data, authorization)
  }

}

export default Parse;