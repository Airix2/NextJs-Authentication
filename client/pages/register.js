import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { Context } from "../context"
import { useRouter } from "next/router"

const Register = () => {
    const [name, setName] = useState('123')
    const [email, setEmail] = useState('123@gmail.com')
    const [password, setPassword] = useState('123')
    const [loading, setLoading] = useState(false)

    const router = useRouter();

    const {state: {user}} = useContext(Context)
    useEffect(() => {
        if (user !== null) {
            router.push("/")
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/register`, {
                name, email, password
            });
            toast.success('Registration successful. Please login');
            setLoading(false)
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="jumbotron text-center">Register</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-4 p-4" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" required />
                    <input type="email" className="form-control mb-4 p-4" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" required />
                    <input type="password" className="form-control mb-4 p-4" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary p-2" disabled={!name || !email || !password || loading}>
                            { loading ? 
                                <SyncOutlined spin />
                                : "Submit"
                            }
                        </button>
                    </div>
                </form>

                <p className="text-center p-3">
                    Already Registered?{" "}
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </p>
            </div>
        </>
    )
}

export default Register