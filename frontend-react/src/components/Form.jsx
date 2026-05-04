import { useState } from "react";
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import LoadingIndicator from './LoadingIndicator'


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
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center p-5 shadow rounded-4 bg-dark text-light" style={{ width: "400px" }}>
        <h1 className="mb-4 text-warning fw-bold">{name}</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3 bg-secondary text-light border-0"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-4 bg-secondary text-light border-0"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {loading && <LoadingIndicator />}

          <button
            type="submit"
            className="btn btn-warning w-100 fw-semibold"
          >
            {name}
          </button>
        </form>
      </div>
    </div>
)
}

export default Form