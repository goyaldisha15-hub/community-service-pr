import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './LoginPage.css'

const dashboardRoutes = { volunteer: '/volunteer/dashboard', ngo_admin: '/ngo/dashboard', ngo_staff: '/staff/events', platform_admin: '/admin/dashboard' }

export default function LoginPage() {
  const { user, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  if (user) return <Navigate to={dashboardRoutes[user.role]} replace />

  function handleSubmit(event) {
    event.preventDefault()
    try { const account = login(email, password); navigate(dashboardRoutes[account.role], { replace: true }) } catch (loginError) { setError(loginError.message) }
  }

  return <section className="login-page"><form className="login-card" onSubmit={handleSubmit}><div className="login-heading"><p className="eyebrow">NGO CONNECT</p><h1>Welcome back</h1><p>Sign in with the account you created.</p></div>{location.state?.message && <p className="form-success">{location.state.message}</p>}{error && <p className="form-error" role="alert">{error}</p>}<label htmlFor="email">Email address</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required /><label htmlFor="password">Password</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" required /><button type="submit">Sign in</button><p className="signup-link">New member? <Link to="/signup">Sign up first</Link></p></form></section>
}
