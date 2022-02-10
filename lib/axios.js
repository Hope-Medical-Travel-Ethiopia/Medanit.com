import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
