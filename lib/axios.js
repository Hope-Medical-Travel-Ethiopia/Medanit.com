import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://api.medanit.com",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;
