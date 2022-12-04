import {
    Container,
    Button,
    Grid,
    Paper,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URI =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:8080'
        : 'https://color-preference.up.railway.app';

const headers = {
    "Access-Control-Allow-Origin": BASE_URI
};

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        pass: "",
        showPass: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await axios
                .post(`${BASE_URI}/api/login`, {
                    username: values.username,
                    password: values.pass,
                }, { headers });
            if (loginResponse.data.loginAllowed) {
                localStorage.setItem("user", values.username);
                const colorPreferenceResponse = await axios.get(
                    `${BASE_URI}/api/get-preference/${values.username}`
                    , { headers });
                if (colorPreferenceResponse.data.colorPreference)
                    localStorage.setItem("colorPreference", colorPreferenceResponse.data.colorPreference);
                navigate("/dashboard");
            } else alert("Wrong Credentials");
        }
        catch (err) { console.error(err); }
    };
    const handlePassVisibilty = () => {
        setValues({
            ...values,
            showPass: !values.showPass,
        });
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    justifyContent="center"
                    style={{ minHeight: "100vh" }}
                >
                    <Paper elelvation={2} sx={{ padding: 5 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        type="text"
                                        fullWidth
                                        label="Enter your username"
                                        placeholder="Username"
                                        variant="outlined"
                                        required
                                        onChange={(e) =>
                                            setValues({ ...values, username: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item>
                                    <TextField
                                        type={values.showPass ? "text" : "password"}
                                        fullWidth
                                        label="Password"
                                        placeholder="Password"
                                        variant="outlined"
                                        required
                                        onChange={(e) =>
                                            setValues({ ...values, pass: e.target.value })
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={handlePassVisibilty}
                                                        aria-label="toggle password"
                                                        edge="end"
                                                    >
                                                        {values.showPass ? (
                                                            <VisibilityOffIcon />
                                                        ) : (
                                                            <VisibilityIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item>
                                    <Button type="submit" fullWidth variant="contained">
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    );
};

export default Login;