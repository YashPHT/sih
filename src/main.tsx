import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/config'

const savedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.classList.add('dark')
}

const savedLang = localStorage.getItem('language')
if (savedLang === 'ur') {
  document.documentElement.setAttribute('dir', 'rtl')
  document.documentElement.classList.add('rtl')
} else {
  document.documentElement.setAttribute('dir', 'ltr')
  document.documentElement.classList.remove('rtl')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
