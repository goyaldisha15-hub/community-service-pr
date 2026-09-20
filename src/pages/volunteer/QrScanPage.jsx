import { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { useAuth } from '../../context/AuthContext'
import { useEvents } from '../../context/EventContext'

export default function QrScanPage() {
  const { user } = useAuth(); const { events, markAttendance } = useEvents(); const [message, setMessage] = useState('Point your camera at the NGO Member event QR.'); const started = useRef(false)
  useEffect(() => {
    if (started.current) return undefined; started.current = true
    const scanner = new Html5QrcodeScanner('qr-reader', { fps: 10, qrbox: { width: 250, height: 250 } }, false)
    scanner.render((decodedText) => { try { const data = JSON.parse(decodedText); const event = events.find((item) => item.id === data.eventId); if (data.type !== 'ngo-attendance' || !event || data.qrToken !== event.qrToken) throw new Error('This QR is invalid or has been replaced.'); if (event.status !== 'live') throw new Error('This event is not live for attendance.'); markAttendance(data.eventId, user.id); setMessage('Attendance marked successfully.'); scanner.clear() } catch (error) { setMessage(error.message) } }, () => {})
    return () => { scanner.clear().catch(() => {}) }
  }, [events, markAttendance, user.id])
  return <section><h1>Scan Event QR</h1><p className="notice">{message}</p><div id="qr-reader" /></section>
}
