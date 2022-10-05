import axios from "axios";

const Authorization = `Bearer ${process.env.REACT_APP_API_TOKEN_A}${process.env.REACT_APP_API_TOKEN_B}`;

let http = axios.create({
  baseURL: "https://api.github.com",
  // url: `/orgs/${org}/repos`,
  timeout: 30000,
  headers: {
    Accept: "application/vnd.github.v3+json",
    Authorization,
  },
});

http.interceptors.request.use(
  (configs) => {
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  // error
  (error) => {
    let { response } = error;
    return Promise.reject(response);
  }
);

export default http;
