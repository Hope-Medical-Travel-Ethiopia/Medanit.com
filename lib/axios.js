import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://data.medanit.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;
