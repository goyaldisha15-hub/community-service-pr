import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './DashboardLayout.css'

const menus = {
  volunteer: [['Dashboard', '/volunteer/dashboard'], ['Events', '/volunteer/events'], ['My Events', '/volunteer/my-events'], ['Scan Event QR', '/volunteer/scan'], ['Profile', '/volunteer/profile']],
  ngo_admin: [['Dashboard', '/ngo/dashboard'], ['Events Management', '/ngo/events'], ['Volunteer Records', '/ngo/volunteers'], ['Team Management', '/ngo/team'], ['Reports', '/ngo/reports'], ['Member QR & Attendance', '/member/qr']],
  ngo_member: [['Event QR', '/member/qr'], ['Registered Volunteers', '/member/volunteers'], ['Attendance List', '/member/attendance']],
}
const icons = { Dashboard: '⌂', Events: '▦', 'My Events': '▤', 'Scan Event QR': '⌗', Profile: '◉', 'Events Management': '▦', 'Volunteer Records': '♧', 'Team Management': '♙', Reports: '▥', 'Member QR & Attendance': '⌗', 'Event QR': '⌗', 'Registered Volunteers': '♧', 'Attendance List': '✓' }
const roleNames = { volunteer: 'Volunteer', ngo_admin: 'NGO Administrator', ngo_member: 'NGO Team Member' }

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth(); const navigate = useNavigate(); const menu = menus[user.role] ?? []
  function signOut() { logout(); navigate('/login', { replace: true }) }
  const initials = user.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  return <div className="dashboard-shell"><header className="dashboard-header"><button className="menu-button" onClick={() => setIsOpen((value) => !value)} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen}>☰</button><Link className="brand" to="/"><span className="brand-mark" aria-hidden="true">N</span>NGO Connect</Link><span className="header-context">Community management</span><div className="header-user"><span className="avatar" aria-hidden="true">{initials}</span>{user.name}</div><button className="signout-button" onClick={signOut}>Sign out</button></header>{isOpen && <button className="sidebar-backdrop" aria-label="Close navigation menu" onClick={() => setIsOpen(false)} />}<aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}><div className="sidebar-profile"><span className="avatar" aria-hidden="true">{initials}</span><div><p className="user-name">{user.name}</p><p className="user-role">{roleNames[user.role] ?? user.role}</p></div></div><p className="nav-label">Workspace</p><nav>{menu.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setIsOpen(false)}><span className="nav-icon" aria-hidden="true">{icons[label] ?? '•'}</span>{label}</NavLink>)}</nav></aside><main className="dashboard-main"><Outlet /></main></div>
}
