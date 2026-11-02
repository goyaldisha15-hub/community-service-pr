import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const dashboardPaths = { volunteer: '/volunteer/dashboard', ngo_admin: '/ngo/dashboard', ngo_member: '/member/qr' }

export default function PublicLayout() {
  const { user } = useAuth()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return <><header className={`public-header ${isHome ? 'public-header-ngo' : ''}`}><Link className="public-ngo-brand" to="/"><span aria-hidden="true">T</span><span>Together<small>community foundation</small></span></Link>{isHome ? <nav aria-label="Main navigation"><a href="#about-us">About us</a><a href="#our-work">Our work</a><a href="#stories">Stories</a>{user && <Link to={dashboardPaths[user.role] ?? '/'}>Dashboard</Link>}<a className="public-header-cta" href="#get-involved">Get involved</a></nav> : <nav><Link to="/">Home</Link>{user ? <Link to={dashboardPaths[user.role] ?? '/'}>Dashboard</Link> : <><Link to="/login">Login</Link><Link to="/signup">Join us</Link></>}</nav>}</header><Outlet /></>
}
