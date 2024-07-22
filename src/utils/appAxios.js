import axios from "axios";

export const appAxios = axios.create({
    baseURL: "https://cgapi-f892d01b36c3.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      "Language" : "tr"
    }
});