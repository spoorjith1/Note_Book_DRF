import { useState } from "react";
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import LoadingIndicator from './LoadingIndicator'
import Title from './Title'
import { Link } from 'react-router-dom'


function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "login" : "register"

    const handleSubmit = async (e)=> {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, {username, password})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }
            else {
                navigate("/login")
            }
        }
        catch (error) {
            alert(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
    <>
    <Title />
    <div className="container d-flex justify-content-center align-items-center">
      <div className="text-center p-5 shadow rounded-4">
        <h1 className="mb-4 fw-bold">{name}</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="input-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {loading && <LoadingIndicator />}

          <button
            type="submit"
            className="btn-action"
          >
            {name}
          </button>
        </form>
        <p style={{ marginTop: "10px" }}>
        {method === "login" ? (
          <>
            New here? <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            Already have an account? <Link to="/login">Login</Link>
          </>
        )}
      </p>
      </div>
    </div>
    </>
)
}

export default Form