import { createContext, useContext, useEffect, useState } from 'react'

const EventContext = createContext(null)
const EVENTS_KEY = 'ngo-connect-events'
const REGISTRATIONS_KEY = 'ngo-connect-registrations'
const initialEvents = [
  { id: 'clean-city-drive', title: 'Clean City Drive', description: 'Join our neighborhood clean-up campaign.', date: '2026-10-04', time: '09:00', location: 'Central Park Gate', capacity: 50, status: 'live', memberIds: [], memberAssignments: [], qrToken: null, qrUpdatedAt: null },
  { id: 'tree-plantation', title: 'Tree Plantation Day', description: 'Help plant native trees in the community.', date: '2026-10-12', time: '07:30', location: 'Riverfront Garden', capacity: 80, status: 'live', memberIds: [], memberAssignments: [], qrToken: null, qrUpdatedAt: null },
]
function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => read(EVENTS_KEY, initialEvents))
  const [registrations, setRegistrations] = useState(() => read(REGISTRATIONS_KEY, []))
  useEffect(() => localStorage.setItem(EVENTS_KEY, JSON.stringify(events)), [events])
  useEffect(() => localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations)), [registrations])
  function createEvent(details) { const memberIds = details.memberIds ?? []; const designation = details.memberDesignation || 'NGO Member'; setEvents((current) => [...current, { ...details, memberIds, memberAssignments: memberIds.map((memberId) => ({ memberId, designation })), id: crypto.randomUUID(), status: 'draft', qrToken: null, qrUpdatedAt: null }]) }
  function updateEvent(id, details) { setEvents((current) => current.map((event) => event.id === id ? { ...event, ...details } : event)) }
  function setEventStatus(id, status) { updateEvent(id, { status }) }
  function generateQr(id) { const qrToken = crypto.randomUUID(); updateEvent(id, { qrToken, qrUpdatedAt: new Date().toLocaleString() }); return qrToken }
  function assignMember(eventId, memberId, designation = 'NGO Member') { setEvents((current) => current.map((event) => { if (event.id !== eventId) return event; const assignments = event.memberAssignments ?? []; const exists = assignments.some((item) => item.memberId === memberId); return { ...event, memberIds: [...new Set([...(event.memberIds ?? []), memberId])], memberAssignments: exists ? assignments.map((item) => item.memberId === memberId ? { ...item, designation } : item) : [...assignments, { memberId, designation }] } })) }
  function registerForEvent(eventId, volunteer) {
    if (registrations.some((item) => item.eventId === eventId && item.volunteerId === volunteer.id)) throw new Error('You are already registered for this event.')
    const event = events.find((item) => item.id === eventId); const count = registrations.filter((item) => item.eventId === eventId).length
    if (!event || count >= event.capacity) throw new Error('This event is no longer available.')
    setRegistrations((current) => [...current, { id: crypto.randomUUID(), eventId, volunteerId: volunteer.id, volunteerName: volunteer.name, volunteerEmail: volunteer.email, attended: false, checkedInAt: null }])
  }
  function markAttendance(eventId, volunteerId) {
    const registration = registrations.find((item) => item.eventId === eventId && item.volunteerId === volunteerId)
    if (!registration) throw new Error('You are not registered for this event.')
    if (registration.attended) throw new Error('Attendance is already marked for this event.')
    setRegistrations((current) => current.map((item) => item.id === registration.id ? { ...item, attended: true, checkedInAt: new Date().toLocaleString() } : item))
  }
  function eventRegistrations(eventId) { return registrations.filter((item) => item.eventId === eventId) }
  return <EventContext.Provider value={{ events, registrations, createEvent, updateEvent, setEventStatus, generateQr, assignMember, registerForEvent, markAttendance, eventRegistrations }}>{children}</EventContext.Provider>
}
export function useEvents() { const context = useContext(EventContext); if (!context) throw new Error('useEvents must be used inside EventProvider.'); return context }
