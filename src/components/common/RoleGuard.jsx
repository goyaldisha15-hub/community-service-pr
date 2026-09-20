import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RoleGuard({ allowedRoles }) {
  const { user } = useAuth()
  if (user.role === 'ngo_admin' || allowedRoles.includes(user.role)) return <Outlet />
  return <Navigate to="/" replace />
}
