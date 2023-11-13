import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3005/api/v1/"
});
export {
  API as A
};
