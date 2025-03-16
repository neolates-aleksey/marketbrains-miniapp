import axios from "axios";

const baseURL = `https://marketbtest.online/apis/gen/`;

const headersConfig = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const api = axios.create({ baseURL: baseURL, headers: headersConfig });
