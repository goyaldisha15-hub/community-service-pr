import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const ACCOUNTS_KEY = 'ngo-connect-accounts'
const SESSION_KEY = 'ngo-connect-session'

function getStoredValue(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
function saveAccounts(accounts) { localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)) }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredValue(SESSION_KEY, null))
  function register({ name, email, password, role }) {
    const accounts = getStoredValue(ACCOUNTS_KEY, [])
    const normalizedEmail = email.trim().toLowerCase()
    if (accounts.some((account) => account.email === normalizedEmail)) throw new Error('An account with this email already exists.')
    const account = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, password, role }
    saveAccounts([...accounts, account])
    return account
  }
  function addNgoMember({ name, email, password }) { if (user?.role !== 'ngo_admin') throw new Error('Only NGO Admins can add NGO Members.'); return register({ name, email, password, role: 'ngo_member' }) }
  function login(email, password) {
    const account = getStoredValue(ACCOUNTS_KEY, []).find((item) => item.email === email.trim().toLowerCase() && item.password === password)
    if (!account) throw new Error('Incorrect email or password. Sign up first if you are new.')
    const sessionUser = { id: account.id, name: account.name, email: account.email, role: account.role }
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser)); setUser(sessionUser); return sessionUser
  }
  function getNgoMembers() { return getStoredValue(ACCOUNTS_KEY, []).filter((account) => account.role === 'ngo_member') }
  function logout() { localStorage.removeItem(SESSION_KEY); setUser(null) }
  return <AuthContext.Provider value={{ user, register, addNgoMember, getNgoMembers, login, logout }}>{children}</AuthContext.Provider>
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used inside AuthProvider.'); return context }
