import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { hasSession } from './lib/session'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'

function ProtectedRoute({ children }: { children: ReactElement }) {
  if (!hasSession()) {
    return <Navigate to="/login" replace />
  }
  return children
}

function PublicOnlyRoute({ children }: { children: ReactElement }) {
  if (hasSession()) {
    return <Navigate to="/main" replace />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={hasSession() ? '/main' : '/login'} replace />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}