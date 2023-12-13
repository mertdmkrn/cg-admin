import axios from "axios";

export const appAxios = axios.create({
    baseURL: "https://caregardenapi-095828432d4f.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      "Language" : "tr"
    }
});