const URL = "http://localhost:8080";

export const fetchFromAPI = async (path, method = 'GET', body = null, headers = null) => {

    try {
        const requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(headers || {})
            },
            body: body ? JSON.stringify(body) : null
        };

        const response = await fetch(`${URL}/${path}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
