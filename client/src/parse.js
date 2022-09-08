import axios from 'axios';
//import API from config
import CONFIG from '../../config.js';

let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/rfp/';

let authorization = { headers: { Authorization: CONFIG.API_KEY } };
//https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products

//https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews

//{ headers: { Authorization: API_KEY } }

const Parse = {
  getAll: (endpoint, params = '') => {
    return axios.get(`${url}${endpoint}${params}`, authorization)
    // .then((data) => {console.log(data)})
    // .catch((err) => console.log('error'))
  },

  // getOne: () => {

  // },

  create: (endpoint, params = '', data) => {
    return axios.post(`${url}${endpoint}${params}`, data, authorization)
  },

  //This is for submitting photos
  upload: (url, data) => {
    return axios.post(url, data)
  },

  update: (endpoint, params = '', data = {}) => {
    //Reviews:
    //  endpoint: reviews/
    //  params: :review_id/helpful  ||  :review_id/report
    //Questions/answers:
    //  endpoint: qa/
    //  params: questions/:question_id/report
    //          answers/:answer_id/helpful
    //          answers/:answer_id/report
    //Both shouldn't need data, but it's there anyways just in case
    //TODO: Figure out how to make sure a user can only perform an action on a particular item once

    return axios.put(`${url}${endpoint}${params}`, data, authorization)
  }

}

export default Parse;