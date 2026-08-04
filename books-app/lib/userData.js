import { getToken } from "./authenticate";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8081";

// Get all favourites
export async function getFavourites() {

    const res = await fetch(`${API_URL}/favourites`, {

        headers: {
            Authorization: `JWT ${getToken()}`
        }

    });

    if (res.status === 200) {

        return await res.json();

    }

    return [];

}

// Add a favourite
export async function addToFavourites(id) {

    const res = await fetch(`${API_URL}/api/user/favourites`, {

        method: "PUT",

        headers: {
            Authorization: `JWT ${getToken()}`
        }

    });

    if (res.status === 200) {

        return await res.json();

    }

    return [];

}

// Remove a favourite
export async function removeFromFavourites(id) {

    const res = await fetch(`${API_URL}/favourites/${id}`, {

        method: "DELETE",

        headers: {
            Authorization: `JWT ${getToken()}`
        }

    });

    if (res.status === 200) {

        return await res.json();

    }

    return [];

}
