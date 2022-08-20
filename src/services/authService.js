import * as request from "./requester";

const baseUrl = 'http://localhost:3030/users';


export const login = async (email, password) => {
    return request.post(`${baseUrl}/login`, { email, password });
}

export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });

        

        return response;
    } catch (error) {
        throw error;
    }
}

export const register = (email,password) => {
    return request.post(`${baseUrl}/register`, { email, password });
}