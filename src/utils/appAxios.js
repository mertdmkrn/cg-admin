import axios from "axios";

export const appAxios = axios.create({
    baseURL: "https://cgappapi-ff676d91c2d7.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      "Language" : "tr"
    }
});