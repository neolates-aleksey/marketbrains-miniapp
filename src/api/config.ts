import axios from "axios";

const baseURL = `http://45.114.62.43/apis/gen/`;

const headersConfig = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const api = axios.create({ baseURL: baseURL, headers: headersConfig });
