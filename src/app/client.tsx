'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import store from "../shared/redux/store.ts";

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

const App = dynamic(() => import('../App.tsx'), { ssr: true })

export function ClientOnly() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    )
}