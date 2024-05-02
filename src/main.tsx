import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import store from "./redux/store.ts";

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
        fontFamily: '"Nunito", sans-serif',
        h1: {
            fontSize: 32,
            fontWeight: '900',
        },
        h2: {
            fontSize: 20,
            lineHeight: '20px',
            fontWeight: 800,
            alignItems: 'baseline',
        },
        h3: {
            fontSize: 16,
            fontWeight: 600,
            marginTop: "10px",
            lineHeight: 'normal'
        },
        h4: {
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
        }
    },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
)
