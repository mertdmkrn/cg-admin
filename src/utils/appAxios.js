import axios from "axios";

export const appAxios = axios.create({
    baseURL: "https://caregarden-71817683236b.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      "Language" : "tr"
    }
});