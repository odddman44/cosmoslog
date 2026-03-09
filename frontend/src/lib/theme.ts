const THEME_KEY = 'cosmoslog.theme'
type Theme = 'light' | 'dark'

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem(THEME_KEY)
  return saved === 'dark' ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  window.localStorage.setItem(THEME_KEY, theme)
}

export function initTheme() {
  applyTheme(getTheme())
}