import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useEvents } from '../../context/EventContext'
export default function VolunteerDashboardPage() { const { user } = useAuth(); const { registrations } = useEvents(); const mine = registrations.filter((item) => item.volunteerId === user.id); return <section><h1>Welcome, {user.name}</h1><div className="stats"><article><b>{mine.length}</b><span>Registered events</span></article><article><b>{mine.filter((item) => item.attended).length}</b><span>Events attended</span></article></div><Link className="primary-link" to="/volunteer/events">Browse events</Link></section> }

// hello