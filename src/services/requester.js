const requester = async (method, url, data,accessToken) => {
    try {
        let buildRequest;

        if (method === 'GET') {
            buildRequest = fetch(url);
        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    'content-type': 'application/json',
                    // 'X-Authorization': accessToken
                },
                body: JSON.stringify(data)
            })
        }

        const response = await buildRequest;

        if (!response.ok) {
            throw new Error(`HTTP error : ${response.status}`)
        }

        if (response.status === 204) {
            return response;
        }

        const result = await response.json();
        return result;


    } catch (error) {
        console.log(error);
        alert(error);
        throw error;
    }
}

export const get = requester.bind({}, 'GET');
export const post = requester.bind({}, 'POST');
export const patch = requester.bind({}, 'PATCH');
export const put = requester.bind({}, 'PUT');
export const remove = requester.bind({}, 'DELETE');


