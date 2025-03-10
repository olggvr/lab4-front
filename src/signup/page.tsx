import { FormEvent, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    Grid2 as Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useSignupUserMutation } from "../store";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [signupUser] = useSignupUserMutation();

    const handleSignup = async (
        email: string,
        username: string,
        password: string
    ) => {
        try {
            await signupUser({
                email,
                username,
                password,
            }).unwrap();
            navigate("/dashboard");
        } catch (err) {
            console.error("Failed to signup", err);
            setError("Signup failed. Please try again.");
        }
    };

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        await handleSignup(email, username, password);
    };

    const goToLogin = () => {
        navigate("/login", { replace: true });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    Signup
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ mt: 2 }}
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Signup
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <Button
                                fullWidth
                                variant="text"
                                onClick={goToLogin}
                                sx={{ color: "text.primary" }}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;
