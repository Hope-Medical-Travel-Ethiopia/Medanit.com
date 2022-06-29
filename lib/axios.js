import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://192.241.153.141",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;
