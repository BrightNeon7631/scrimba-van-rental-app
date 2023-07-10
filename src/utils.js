import { redirect } from "react-router-dom";

export function requireAuth() {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        // workaround to fix miragejs error
        const response = redirect("/login?message=You must log in first");
        response.body = true;
        throw response;
    }
    return null;
}