import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Контексто',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/svg+xml" href="/vite.svg"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200..1000&display=swap" rel="stylesheet"/>
            </head>
            <body>
            <div id="root">{children}</div>
            </body>
        </html>
    )
}