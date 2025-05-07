import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from "@/app.tsx";
import {ThemeProvider} from './components/theme-provider';
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App/>
        </ThemeProvider>
        </Router>
    </StrictMode>,
)
