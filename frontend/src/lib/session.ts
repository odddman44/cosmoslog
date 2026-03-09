const SESSION_KEY = 'cosmoslog.session'

export function hasSession() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(SESSION_KEY) === 'active'
}

export function createSession() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SESSION_KEY, 'active')
}

export function clearSession() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(SESSION_KEY)
}