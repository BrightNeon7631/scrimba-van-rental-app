import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError();

    if (error.message && error.statusText && error.status) {
        return (
            <div className="error--container">
                <h1>Error: {error.message}</h1>
                <pre>{error.status} : {error.statusText}</pre>
            </div>
        )
    } else {
        return (
            <h1 className="error--container">Unexpected Error</h1>
        )
    }
}