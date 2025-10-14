import axios from "axios";

export const appAxios = axios.create({
    baseURL: "https://uninterested-nerta-caregarden37-894fa251.koyeb.app",
    headers: {
      "Content-Type": "application/json",
      "Language" : "tr"
    }
});