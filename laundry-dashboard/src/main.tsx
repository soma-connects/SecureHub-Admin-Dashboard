import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DateRangeProvider } from './context/DateRangeContext.tsx'
import { ThemeProvider } from './components/theme/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DateRangeProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </DateRangeProvider>
  </StrictMode>,
)
