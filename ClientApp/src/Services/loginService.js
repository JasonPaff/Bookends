export default async function login(email, password) {
    // Login info.
    const loginInfo = {
        email: email,
        password: password
    };

    // Login request headers.
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo)
    };

    // Login request.
    let response = await fetch('https://localhost:7162/auth/login', headers);
    response = await response.json();

    // Login response.
    if(response.success === false) {
        return response.message;
    }
    else {
        localStorage.auth = response.data;
        
        console.log("auth token: " + localStorage.auth);
        const d = JSON.parse(atob("eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSmFzb25QYWZmQGdtYWlsLmNvbSIsImV4cCI6MTY0NTY0NzM1Nn0"));
        console.log(d);
        console.log("id: " + d['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
        console.log("email: " + d['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
        
        return "";
    }
}