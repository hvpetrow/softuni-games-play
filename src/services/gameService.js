import * as request from "./requester";

const baseUrl = 'http://localhost:3030';

export const getAll = async () => {
  return request.get(`${baseUrl}/data/games`);
}

export const getOne = async (gameId) => {
  return request.get(`${baseUrl}/data/games/${gameId}`);
}

export const addGame = async (game) => {
  return request.post(`${baseUrl}/data/games`,game);
}

export const editGame = async (game) => {
  return request.put(`${baseUrl}/data/games/${game._id}`,game); 
}

export const remove = async (gameId) => {
  return request.remove(`${baseUrl}/data/games/${gameId}`);
}