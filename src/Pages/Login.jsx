import { 
    useLoaderData, 
    Form, 
    redirect, 
    useActionData, 
    useNavigation
} from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    
    const pathname = new URL(request.url).searchParams.get("redirectTo") || '/host';

    try {
        await loginUser({email, password});
        return redirect(pathname);
    } catch (err) {
        return err.message;
    }
}

export default function Login() {
    const urlMessage = useLoaderData();
    const errorMessage = useActionData();
    const status = useNavigation().state;

    return (
        <div className="login--container">
            <h1>Sign in to your account</h1>
            {urlMessage ? <h3 className="red">{urlMessage}</h3> : ''}
            {errorMessage ? <h3 className="red">{errorMessage}</h3> : ''}
            <Form method="post" replace>
                <input 
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                />
                <input 
                    name="password"
                    type="password"
                    placeholder="Enter password"
                />
                <button 
                    style={status === 'submitting' ? { backgroundColor: 'gray' } : { }} 
                    disabled={status === 'submitting'}
                    >
                    {status === 'submitting' ? 'Logging in...' : 'Log in'}
                </button>
            </Form>
        </div>
    )
}