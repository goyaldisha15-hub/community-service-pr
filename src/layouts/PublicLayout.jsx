import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicLayout() {
  const { user } = useAuth()
  return <><header className="public-header"><Link className="brand" to="/">NGO Connect</Link><nav>{user ? <Link to="/">Dashboard</Link> : <><Link to="/login">Login</Link><Link to="/signup">Sign Up</Link></>}</nav></header><Outlet /></>
}
