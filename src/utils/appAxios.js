import axios from "axios";

export const appAxios = axios.create({
    baseURL: "https://care-garden-d6bba986d349.herokuapp.com",
    headers: {
      "Content-Type": "application/json"
    }
});