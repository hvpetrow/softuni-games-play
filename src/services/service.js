import * as request from "./requester";

const baseUrl = 'http://localhost:3030';

export const getAll = async () => {
  return request.get(`${baseUrl}/data/games`);
}