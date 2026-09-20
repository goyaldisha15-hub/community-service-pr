import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useEvents } from '../../context/EventContext'
export default function EventDetailsPage() { const { eventId } = useParams(); const { user } = useAuth(); const { events, registerForEvent } = useEvents(); const [message, setMessage] = useState(''); const event = events.find((item) => item.id === eventId); if (!event) return <p>Event not found.</p>; function register() { try { registerForEvent(event.id, user); setMessage('Registration successful. Scan the NGO Member QR at the event.'); } catch (error) { setMessage(error.message) } } return <section className="event-card"><h1>{event.title}</h1><p>{event.description}</p><p>📅 {event.date}, {event.time}</p><p>📍 {event.location}</p>{message && <p className="notice">{message}</p>}<button onClick={register}>Register for event</button><Link to="/volunteer/my-events">My Events</Link></section> }
