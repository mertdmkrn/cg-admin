import axios from "axios";

export const appAxios = axios.create({
    baseURL: "https://cg-api-30d9a01b4cf7.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      "Language" : "tr"
    }
});