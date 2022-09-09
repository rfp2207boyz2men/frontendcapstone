import axios from 'axios';
<<<<<<< HEAD
//import API from config
=======
>>>>>>> 45ffc64af63063a3666c2d3473266097df3f90a2
import CONFIG from '../../config.js';

let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/';

let authorization = { headers: { Authorization: CONFIG.API_KEY } };
<<<<<<< HEAD
//https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products

//https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews

//{ headers: { Authorization: API_KEY } }
=======
>>>>>>> 45ffc64af63063a3666c2d3473266097df3f90a2

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