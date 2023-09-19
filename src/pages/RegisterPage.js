import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, TextField, IconButton, InputAdornment, InputLabel, Select, MenuItem } from '@mui/material';
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

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const mdUp = useResponsive('up', 'md');


    const [user, setUser] = useState({ email: "", password: '', name: '' })

    const handleClick = async () => {
        let res = await fetch('https://shikhhoni-backend.vercel.app/user/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })

        res = await res.json()

        console.log("response", res)
        if (res.msg === 'failed' || res.data.length === 0) {

            alert('Registration Failed')

        } else {

            localStorage.setItem('accessToken', res.accesstoken)
            localStorage.setItem('authStatus', "true")
            localStorage.setItem('userId', res._id)

            window.location.assign("https://shikkhoni-frontend.vercel.app/dashboard/app")


        }

    };
    return (
        <>
            <Helmet>
                <title> Register </title>
            </Helmet>

            <StyledRoot>
              

                {mdUp && (
                    <StyledSection>
                        <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 1 }}>
                            Hi, Welcome 👋<br/>
                            Register and lets get started 🚀
                        </Typography>
                        <img src="/assets/illustrations/illustration_login.png" alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" align='center' gutterBottom>
                            Sign In
                        </Typography>

                     

                        <Stack spacing={3}>
                            <TextField name="name" value={user.name} onChange={(event) => setUser({ ...user, name: event.target.value })} label="User Name" />

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



                        <LoadingButton fullWidth size="large" style={{marginTop:'20px', backgroundColor:'green'}} type="submit" variant="contained" onClick={handleClick}>
                            Register
                        </LoadingButton>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
