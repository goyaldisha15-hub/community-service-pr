import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProtectedRoute from '../components/common/ProtectedRoute'
import RoleGuard from '../components/common/RoleGuard'
import PublicLayout from '../layouts/PublicLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import LoginPage from '../pages/auth/LoginPage'
import SignUpPage from '../pages/auth/SignUpPage'
import VolunteerDashboardPage from '../pages/volunteer/VolunteerDashboardPage'
import EventsListPage from '../pages/volunteer/EventsListPage'
import EventDetailsPage from '../pages/volunteer/EventDetailsPage'
import MyEventsPage from '../pages/volunteer/MyEventsPage'
import VolunteerProfilePage from '../pages/volunteer/VolunteerProfilePage'
import QrScanPage from '../pages/volunteer/QrScanPage'
import NgoDashboardPage from '../pages/ngo/NgoDashboardPage'
import EventsManagementPage from '../pages/ngo/EventsManagementPage'
import EventFormPage from '../pages/ngo/EventFormPage'
import EventManagementDetailsPage from '../pages/ngo/EventManagementDetailsPage'
import TeamManagementPage from '../pages/ngo/TeamManagementPage'
import NgoVolunteersPage from '../pages/ngo/NgoVolunteersPage'
import ReportsPage from '../pages/ngo/ReportsPage'
import MemberQrPage from '../pages/member/MemberQrPage'
import MemberVolunteersPage from '../pages/member/MemberVolunteersPage'
import MemberAttendancePage from '../pages/member/MemberAttendancePage'

const homes = { volunteer: '/volunteer/dashboard', ngo_admin: '/ngo/dashboard', ngo_member: '/member/qr' }
function Home() { const { user } = useAuth(); return <Navigate to={homes[user.role]} replace /> }

export default function AppRoutes() { return <Routes>
  <Route element={<PublicLayout />}><Route path="/login" element={<LoginPage />} /><Route path="/signup" element={<SignUpPage />} /></Route>
  <Route element={<ProtectedRoute />}><Route element={<DashboardLayout />}>
    <Route path="/" element={<Home />} />
    <Route element={<RoleGuard allowedRoles={['volunteer']} />}><Route path="/volunteer/dashboard" element={<VolunteerDashboardPage />} /><Route path="/volunteer/events" element={<EventsListPage />} /><Route path="/volunteer/events/:eventId" element={<EventDetailsPage />} /><Route path="/volunteer/my-events" element={<MyEventsPage />} /><Route path="/volunteer/scan" element={<QrScanPage />} /><Route path="/volunteer/profile" element={<VolunteerProfilePage />} /></Route>
    <Route element={<RoleGuard allowedRoles={['ngo_admin']} />}><Route path="/ngo/dashboard" element={<NgoDashboardPage />} /><Route path="/ngo/events" element={<EventsManagementPage />} /><Route path="/ngo/events/new" element={<EventFormPage />} /><Route path="/ngo/events/:eventId" element={<EventManagementDetailsPage />} /><Route path="/ngo/team" element={<TeamManagementPage />} /><Route path="/ngo/volunteers" element={<NgoVolunteersPage />} /><Route path="/ngo/reports" element={<ReportsPage />} /></Route>
    <Route element={<RoleGuard allowedRoles={['ngo_member']} />}><Route path="/member/qr" element={<MemberQrPage />} /><Route path="/member/volunteers" element={<MemberVolunteersPage />} /><Route path="/member/attendance" element={<MemberAttendancePage />} /></Route>
  </Route></Route><Route path="*" element={<Navigate to="/" replace />} />
</Routes> }
