import { redirect } from "react-router-dom";

export function requireAuth(request) {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const pathname = new URL(request.url).pathname;

    if (!isLoggedIn) {
        // workaround to fix miragejs error
        const response = redirect(`/login?message=You must log in first&redirectTo=${pathname}`);
        response.body = true;
        throw response;
    }
    return null;
}