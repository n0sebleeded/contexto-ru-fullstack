import React from 'react';
import {Container, Typography} from "@mui/material";

const Header:React.FC = () => {
    return (
        <header>
            <Container>
                <Typography variant="h1">Контексто</Typography>
            </Container>
        </header>
    );
};

export default Header;