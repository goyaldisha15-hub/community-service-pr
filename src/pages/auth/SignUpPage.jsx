import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './LoginPage.css'

export default function SignUpPage() {
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'volunteer' })
  const [error, setError] = useState('')
  if (user) return <Navigate to="/" replace />

  function updateField(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); setError('') }
  function handleSubmit(event) {
    event.preventDefault()
    if (form.password.length < 6) return setError('Use a password with at least 6 characters.')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    try { register(form); navigate('/login', { replace: true, state: { message: 'Account created. Please sign in.' } }) } catch (registerError) { setError(registerError.message) }
  }

  return <section className="login-page"><form className="login-card" onSubmit={handleSubmit}><div className="login-heading"><p className="eyebrow">NGO CONNECT</p><h1>Create your account</h1><p>Every new member must sign up before logging in.</p></div>{error && <p className="form-error" role="alert">{error}</p>}<label htmlFor="name">Full name</label><input id="name" name="name" value={form.name} onChange={updateField} required /><label htmlFor="signup-email">Email address</label><input id="signup-email" name="email" type="email" value={form.email} onChange={updateField} required /><label htmlFor="signup-role">Account type</label><select id="signup-role" name="role" value={form.role} onChange={updateField}><option value="volunteer">Volunteer</option><option value="ngo_admin">NGO Admin</option></select><p className="role-note">NGO Members are created by an NGO Admin from Team Management.</p><label htmlFor="signup-password">Password</label><input id="signup-password" name="password" type="password" value={form.password} onChange={updateField} minLength="6" required /><label htmlFor="confirm-password">Confirm password</label><input id="confirm-password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} required /><button type="submit">Create account</button><p className="signup-link">Already have an account? <Link to="/login">Login</Link></p></form></section>
}
