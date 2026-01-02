// dataProvider.js
import axios from "axios";
export function getDataFromServer() {
  return axios.get('http://127.0.0.1:8080/course/selectAll');
}
