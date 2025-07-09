import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // change to your backend URL
  withCredentials: true, // optional, if you're using cookies
});

export default API;