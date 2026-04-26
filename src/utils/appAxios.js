import axios from "axios";

export const appAxios = axios.create({
    baseURL: "https://mere-gates-mertdmkrn-f8d7a756.koyeb.app",
    headers: {
      "Content-Type": "application/json",
      "Language" : "tr"
    }
});