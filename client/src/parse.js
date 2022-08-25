import axios from 'axios';
// import API_KEY from '../../config.js';



let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

let authorization = { headers: { Authorization: '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' } };
//https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products

//https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews

//{ headers: { Authorization: API_KEY } }

const Parse = {
  getAll: (endpoint, params = '') => {
    return axios.get(`${url}${endpoint}${params}`, authorization)
    // .then((data) => {console.log(data)})
    // .catch((err) => console.log('error'))
  }

  // getOne: () => {

  // },

  // create: (data) => {

  // },

  // update: () => {

  // }

}

export default Parse;