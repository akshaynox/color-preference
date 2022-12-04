import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, CssBaseline, Toolbar, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from "axios";

const BASE_URI =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080'
        : 'https://color-preference.up.railway.app';

const headers = {
    "Access-Control-Allow-Origin": BASE_URI
};

const Dashboard = () => {
    const user = localStorage.getItem('user');
    const colorPreference = localStorage.getItem('colorPreference') || "#2196f3";
    const [primaryColor, setPrimaryColor] = useState(colorPreference)
    const navigate = useNavigate();
    const colorRef = useRef();

    const theme = createTheme({
        palette: {
            primary: {
                main: primaryColor,
            },
        },
    });

    const handleColorPick = async () => {
        const selectedColor = colorRef.current.value;
        if (selectedColor !== colorPreference) {
            try {
                const savePreferenceResponse = await axios
                    .post(`${BASE_URI}/api/save-preference`, {
                        username: user,
                        colorPreference: selectedColor,
                    }, { headers });
                if (savePreferenceResponse.data.preferenceUpdated) {
                    localStorage.setItem('colorPreference', selectedColor);
                } else {
                    alert('Could not update color preference in DB');
                }
            } catch (err) {
                console.log(err);
                alert("Could not update color preference");
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('colorPreference');
        navigate("/");
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative" style={
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Hello, {user}
                    </Typography>
                </Toolbar>
                <Toolbar style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                    <Typography variant="h7" noWrap>
                        Select primary color by clicking below
                    </Typography>
                    <input type="color"
                        ref={colorRef}
                        onBlur={() => handleColorPick()}
                        onInput={(e) => setPrimaryColor(e.target.value)}
                    />
                </Toolbar>
                <Toolbar>
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default Dashboard;
