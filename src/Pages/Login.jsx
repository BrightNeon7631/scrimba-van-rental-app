import { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message");
}

export default function Login() {
    const [formData, setFormData] = useState({email: "", password: ""});
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const urlMessage = useLoaderData();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => {
            return ({
                ...prevState,
                [name]: value
            })
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        async function signIn() {
            setStatus('submitting');
            setError(null);
            try {
                await loginUser(formData);
                navigate('/host', { replace: true });
            } catch (err) {
                setError(err);
            } finally {
                setStatus('idle');
            }
        }
        signIn();
    }

    return (
        <div className="login--container">
            <h1>Sign in to your account</h1>
            {urlMessage ? <h3 className="red">{urlMessage}</h3> : ''}
            {error ? <h3 className="red">{error.message}</h3> : ''}
            <form>
                <input 
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    onChange={handleChange}
                    value={formData.email}
                />
                <input 
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    value={formData.password}
                />
                <button 
                    style={status === 'submitting' ? { backgroundColor: 'gray' } : { }} 
                    disabled={status === 'submitting'}
                    onClick={handleSubmit} 
                    >
                    {status === 'submitting' ? 'Logging in...' : 'Log in'}
                </button>
            </form>
        </div>
    )
}