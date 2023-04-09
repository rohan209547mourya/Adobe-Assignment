import Cookie from 'js-cookie'

 const URL = "https://adobe-assignment.onrender.com";
// const URL = "http://localhost:8080";

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
        console.log(error.message);
    }
};

export const createNewPost = async (body, edit=false) => {  

    if(!edit) {

        const res = await fetchFromAPI('posts', 'POST',body, {
            'x-auth-token' : Cookie.get('x-auth-token'),
        } );
    
        return res;

    } 

    else{


        const res = await fetchFromAPI(`posts/${body._id}`, 'PUT',body, {
            'x-auth-token' : Cookie.get('x-auth-token'),
        } );
    
        return res;

    }
}
