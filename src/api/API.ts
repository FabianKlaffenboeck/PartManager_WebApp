export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export function genHeader() {
    return {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
}

export async function loginReq(username: string, password: string): Promise<string> {
    const response = await fetch(API_ENDPOINT + '/login', {
        method: 'POST',
        headers: genHeader(),
        body: JSON.stringify({username, password})
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.token;
}

export async function signupReq(username: string, password: string): Promise<number> {
    const response = await fetch(API_ENDPOINT + '/register', {
        method: 'POST',
        headers: genHeader(),
        body: JSON.stringify({username, password})
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
}