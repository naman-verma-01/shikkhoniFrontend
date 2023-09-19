import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui

import { styled } from '@mui/material/styles';

import {
    Stack,
    Button,
    Checkbox,
    MenuItem,
    Container,
    Typography,
    IconButton,
    TextField,
    Snackbar,
    Alert,
    FormControlLabel,


} from '@mui/material';
// components
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------





const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 1000,
    margin: 'auto',
    maxHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));



// ----------------------------------------------------------------------


export default function NewOrder() {


    const [open, setOpen] = useState(false);
    const [file, setFile] = useState({ title: '', url: '', type: '' });
    const navigate = useNavigate()


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const checkAuthStatus = async()=>{
        if(!localStorage.getItem('authStatus')){
            navigate('/login')
        }
    }

    useEffect(()=>{
        checkAuthStatus();
    })

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



    const handleClick = async () => {

        const bodyData = { ...file, userId: localStorage.getItem('userId') }


        let res = await fetch('https://shikhhoni-backend.vercel.app/media/addMedia',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyData),
            })

        res = await res.json()

        console.log('Res', res)

        if (res.msg === 'Successfull') {

            setOpen(true)

            setFile({
                title: '',
                url: '',
                type: '',
            })

        }


    }



    return (
        <>
            <Helmet>
                <title> New File </title>
            </Helmet>

            <Container >
                <StyledContent>
                    <Typography variant="h4" textAlign='center' marginBottom={5} gutterBottom>
                        Add a New File
                    </Typography>



                    <Stack spacing={2}>

                        <TextField name="Title" value={file.title} onChange={(event) => setFile({ ...file, title: event.target.value })} label="Title"  />

                        <TextField name="Type" value={file.type} onChange={(event) => setFile({ ...file, type: event.target.value })} label="Type" select  >
                            <MenuItem value='image'>IMAGE</MenuItem>
                            <MenuItem value='pdf'>PDF</MenuItem>
                            <MenuItem value='doc'>DOC</MenuItem>
                            <MenuItem value='exe'>EXE</MenuItem>
                            <MenuItem value='video'>VIDEO</MenuItem>
                        </TextField>

                        <TextField name="URL" value={file.url} onChange={(event) => setFile({ ...file, url: event.target.value })} label="URL"  />

                    </Stack>


                    <div style={{ marginTop: '20px' }}>
                        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                            Add
                        </LoadingButton>
                    </div>



                </StyledContent>
            </Container>

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Customer Added SuccessFully !"
                action={action}
                severity="success"
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Customer Added SuccessFully !
                </Alert>
            </Snackbar>



        </>
    );
}
