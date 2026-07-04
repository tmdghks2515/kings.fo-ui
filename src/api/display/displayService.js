import { httpClient } from "../httpClient";

export const displayService = {
  getCurationPageByType(type) {
    return httpClient.get(`/api/public/curation-pages/${type}`);
  },
};
