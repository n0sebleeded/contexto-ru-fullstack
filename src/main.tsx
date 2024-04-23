import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createTheme, ThemeProvider} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
            dark: '#717273',
        },
        secondary: {
            main: '#15202B',
            light: '#273340',
        },
    },
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        h1: {
            fontSize: 32,
            fontWeight: 'bold',
        },
        h2: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        h3: {
            fontSize: 18,
            margin: "0.5em 0"
        },
    },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
  </React.StrictMode>,
)
