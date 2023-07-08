import { useState } from "react"

export default function Login() {
    const [formData, setFormData] = useState({email: "", password: ""});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevState => {
            return ({
                ...prevState,
                [name]: value
            })
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div className="login--container">
            <h1>Sign in to your account</h1>
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
                <button onClick={handleSubmit}>Log in</button>
            </form>
        </div>
    )
}