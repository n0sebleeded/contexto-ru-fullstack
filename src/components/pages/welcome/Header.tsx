import React from 'react';
import {Container, Typography} from "@mui/material";
import '../../components-style/header.css'

const Header:React.FC = () => {
    return (
        <header className="header">
            <Container>
                <Typography variant="h1" sx={{ textTransform: "uppercase", fontSize: "24px" }}>Контексто</Typography>
            </Container>
        </header>
    );
};

export default Header;