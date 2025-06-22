export const backEndUrl: string = "http://localhost:8080/api";

export function genHeader() {
    return {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
}

export async function loginReq(username: string, password: string): Promise<string> {
    const response = await fetch(backEndUrl + '/login', {
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
    const response = await fetch(backEndUrl + '/register', {
        method: 'POST',
        headers: genHeader(),
        body: JSON.stringify({username, password})
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
}