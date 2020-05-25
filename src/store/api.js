import axios from 'axios';

class Api {
  api = null;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://meumercado.online/api/',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
  }

  setToken = (token) => {
    this.api.defaults.headers.common['Authorization'] = "Bearer " + token;
  };

  clearToken = () => {
    this.api.defaults.headers.common['Authorization'] = "";
  };

  post = (route, props) => this.api.post(route, props);
  get = (route) => this.api.get(route);
}

export default new Api();