import { useState, useContext, useEffect } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { Context } from "../context"
import {useRouter} from 'next/router'

const Login = () => {
    const [email, setEmail] = useState('123@gmail.com')
    const [password, setPassword] = useState('123')
    const [loading, setLoading] = useState(false)

    // State
    const {state, dispatch} = useContext(Context)
    const { user } = state

    useEffect(() => {
        if (user !== null) router.push("/");
    }, [user])
    
    
    // Router
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/login`, {
                email, password
            });
            toast.success('Login successful');
            dispatch({
                type: "LOGIN",
                payload: data
            })

            // save in local storage
            window.localStorage.setItem('user', JSON.stringify(data));
            // setLoading(false)
            router.push("/")
        } catch (err) {
            console.log(err)
            toast.error(err.response.data);
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="jumbotron text-center">Login</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="email" className="form-control mb-4 p-4" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" required />
                    <input type="password" className="form-control mb-4 p-4" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary p-2" disabled={!email || !password || loading}>
                            { loading ? 
                                <SyncOutlined spin />
                                : "Submit"
                            }
                        </button>
                    </div>
                </form>

                <p className="text-center p-3">
                    Don't have an account?{" "}
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </p>
            </div>
        </>
    )
}

export default Login