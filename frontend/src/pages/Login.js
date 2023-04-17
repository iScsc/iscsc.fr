import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogin } from '../hooks/useLogin'
const { useState } = require('react')

const Login = ({ next }) => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  if (user) navigate(next)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading, ok } = useLogin()

  const handleSubmit = async e => {
    e.preventDefault()
    await login(email, password)
    if (ok) {
      navigate(next)
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Log in</h1>

      <label>Email:</label>
      <input
        type="email"
        onChange={e => {
          setEmail(e.target.value)
        }}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={e => {
          setPassword(e.target.value)
        }}
        value={password}
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className="signup-error">{error}</div>}
    </form>
  )
}

export default Login
