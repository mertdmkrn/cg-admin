import axios from "axios";

export const appAxios = axios.create({
    baseURL: "https://caregardenapi-e4dcd7cce01f.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      "Language" : "tr"
    }
});