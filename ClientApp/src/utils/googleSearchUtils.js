import GoogleSearchOptions from "../models/GoogleSearchOptions";

export async function googleBooksSearch(keyword, options = new GoogleSearchOptions()) {
    const headers = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options)
    };

    const response = await fetch(`https://localhost:7162/book/${keyword}`, headers);
    return await response.json();
}

export async function googleBookUrlSearch(id) {
    const headers = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const response = await fetch(`https://localhost:7162/book/${id}`, headers);
    return await response.json();
}
