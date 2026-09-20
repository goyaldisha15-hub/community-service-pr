import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './DashboardLayout.css'

const menus = {
  volunteer: [['Dashboard', '/volunteer/dashboard'], ['Events', '/volunteer/events'], ['My Events', '/volunteer/my-events'], ['Scan Event QR', '/volunteer/scan'], ['Profile', '/volunteer/profile']],
  ngo_admin: [['Dashboard', '/ngo/dashboard'], ['Events Management', '/ngo/events'], ['Volunteer Records', '/ngo/volunteers'], ['Team Management', '/ngo/team'], ['Reports', '/ngo/reports'], ['Member QR & Attendance', '/member/qr']],
  ngo_member: [['Event QR', '/member/qr'], ['Registered Volunteers', '/member/volunteers'], ['Attendance List', '/member/attendance']],
}

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth(); const navigate = useNavigate(); const menu = menus[user.role] ?? []
  function signOut() { logout(); navigate('/login', { replace: true }) }
  return <div className="dashboard-shell"><header className="dashboard-header"><button className="menu-button" onClick={() => setIsOpen((value) => !value)} aria-label="Open navigation menu">☰</button><Link className="brand" to="/">NGO Connect</Link><button className="signout-button" onClick={signOut}>Sign out</button></header><aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}><p className="user-name">{user.name}</p><p className="user-role">{user.role.replace('_', ' ')}</p><nav>{menu.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setIsOpen(false)}>{label}</NavLink>)}</nav></aside><main className="dashboard-main"><Outlet /></main></div>
}
