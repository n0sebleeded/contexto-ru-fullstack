import React from 'react';
import {Container, Typography} from "@mui/material";
import './components-style/header.css'

const Header:React.FC = () => {
    return (
        <header className="header">
            <Container>
                <Typography variant="h1">Контексто</Typography>
            </Container>
        </header>
    );
};

export default Header;