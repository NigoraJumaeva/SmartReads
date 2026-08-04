import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:8081/api/user";

// Save JWT in a cookie
export function setToken(token) {
    Cookies.set("access_token", token);
}

// Read JWT from cookie
export function getToken() {
    return Cookies.get("access_token");
}

// Remove JWT
export function removeToken() {
    Cookies.remove("access_token");
}

// Decode JWT
export function readToken() {

    try {

        return jwtDecode(getToken());

    } catch (err) {

        return null;

    }

}

// Check if user is logged in
export function isAuthenticated() {

    const token = readToken();

    return token ? true : false;

}

// Login
export async function authenticateUser(userName, password) {

    const res = await fetch(`${API_URL}/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            userName,
            password
        })

    });

    const data = await res.json();

    if (res.status === 200) {

        setToken(data.message.token);

        return true;

    } else {

        throw new Error(data.message);

    }

}

// Register
export async function registerUser(userName, password, password2) {

    const res = await fetch(`${API_URL}/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            userName,

            password,

            password2

        })

    });

    const data = await res.json();

    if (res.status === 200) {

        return true;

    } else {

        throw new Error(data.message);

    }

}