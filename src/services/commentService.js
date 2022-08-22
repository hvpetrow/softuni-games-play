import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/comments';

export const create = async (gameId, comment) => {
    return request.post(baseUrl, { gameId, text: comment })
}

export const getByGameId = async (gameId) => {
    const relations = encodeURIComponent(`user=_ownerId:users`);
    const search = encodeURIComponent(`gameId="${gameId}"`);
    return request.get(`${baseUrl}/?where=${search}&load=${relations}`); 
  }