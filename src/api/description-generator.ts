import { api } from "./config";

export interface IGenerateDescriptionBody {
  advantages: string[];
  auth_token: string;
  key_words: string[];
  length: string;
  minus_words: string[];
  product_name: string;
  text_tone: string;
}

async function makeReport(body: IGenerateDescriptionBody) {
  return await api.post(`/make-report`, body);
}

export const descriptionGeneratorAPI = {
  makeReport,
};
