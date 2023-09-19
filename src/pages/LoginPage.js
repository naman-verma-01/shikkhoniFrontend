import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, TextField, IconButton, InputAdornment, Alert, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';
// sections

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const mdUp = useResponsive('up', 'md');


    const [user, setUser] = useState({ email: "", password: '' })

    useEffect(()=>{
        localStorage.removeItem('authStatus')
        localStorage.removeItem('accessToken')
    },[])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <>

            <IconButton
                size="small"
                aria-label="close"
                color="red"
                onClick={handleClose}
            >
                Close
            </IconButton>
        </>
    );

    const [open, setOpen] = useState(false);


    const handleClick = async () => {
        let res = await fetch(`https://shikhhoni-backend.vercel.app/user/login?email=${user.email}&password=${user.password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        res = await res.json()
        console.log("response", res, user)
        if (res.msg === 'failed' || res.data === 0) {

            setOpen(true)

        } else {

            localStorage.setItem('accessToken', res.accesstoken)
            localStorage.setItem('authStatus', "true")
            localStorage.setItem('userId', res._id)

            window.location.assign("http://localhost:3000/dashboard/app")

        }

    };
    return (
        <>
            <Helmet>
                <title> Login </title>
            </Helmet>

            <StyledRoot>


            {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hi, Welcome Back 😀
                        </Typography>
                        <img src="/assets/illustrations/illustration_login.png" alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" align='center' gutterBottom>
                            Log In
                        </Typography>

                        <Typography variant="body2" align='center' sx={{ mb: 5 }}>
                            Don’t have an account? {''}
                            <Link href='./register' variant="subtitle2">Get started</Link>
                        </Typography>

                        <Stack spacing={3}>
                            <TextField name="email" value={user.email} onChange={(event) => setUser({ ...user, email: event.target.value })} label="Email address" />

                            <TextField
                                name="password"
                                label="Password"
                                value={user.password}
                                onChange={(event) => setUser({ ...user, password: event.target.value })}
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Stack>



                        <LoadingButton fullWidth size="large" type="submit" style={{ marginTop: '20px', backgroundColor: 'green' }} variant="contained" onClick={handleClick}>
                            Login
                        </LoadingButton>
                    </StyledContent>
                </Container>
            </StyledRoot>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Order Request SuccessFull !"
                action={action}
                severity="success"
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Login Failed!
                </Alert>
            </Snackbar>
        </>
    );
}