import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
// @mui
import {
  Grid, Container, Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Button, TablePagination
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// sections
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

import Scrollbar from '../components/scrollbar';

import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';


const TABLE_HEAD = [
  { id: '', label: '', alignRight: false },
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'file name', label: 'File Name', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'url', label: 'URL', alignRight: false },
  { id: '', label: '', alignRight: false },
];


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])
  const [fileCount, setFileCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const checkAuthStatus = async () => {
    if (!localStorage.getItem('authStatus')) {
      navigate('/login')
    }
  }

  useEffect(() => {
    checkAuthStatus();
  })


  useEffect(() => {
    getFiles()
  }, [])



  const getFiles = async () => {
    let res;

    res = await fetch(`https://shikhhoni-backend.vercel.app/media/getAllMedia?userId=${localStorage.getItem('userId')}`)

    res = await res.json();

    console.log("USER DARA", res.data)
    setFiles(res.data)
    setFileCount(res.data.length)
  }



  const deleteFile = async (_id) => {

    let res;

    res = await fetch(`https://shikhhoni-backend.vercel.app/media/deleteFile?_id=${_id}`, {
      method: 'DELETE'
    })

    res = await res.json();

    console.log("DELETION RESPOSNE ==> ", res)

    let arr = [...files]

    arr = arr.filter((elem) => elem._id !== _id)

    setFiles(arr)

  }

  const getThumbnail = (type,url) => {
    switch (type) {
      case 'image':
        return url
      case 'pdf':
        return 'https://cdn-icons-png.flaticon.com/512/4208/4208479.png'
      case 'doc':
        return 'https://cdn-icons-png.flaticon.com/512/5968/5968517.png'
      case 'exe':
        return 'https://cdn-icons-png.flaticon.com/512/29/29614.png'
      case 'video':
        return 'https://cdn-icons-png.flaticon.com/512/4503/4503915.png'
      default:
        return ''

    }
  }

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">


        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="Total Files" color='success' total={fileCount} icon={'icon-park-outline:order'} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary title="New Files" total={2} icon={'icon-park-outline:order'} />
          </Grid>



          <Container style={{ marginTop: '50px', width: '100%', paddingRight: '0' }} >


            <Card >
              <Button variant='contained' color='info' onClick={() => { navigate('/dashboard/newFile') }} sx={{ marginLeft: 3, marginTop: 3, paddingBottom: 1 }}>+ New File</Button>

              <UserListToolbar title={'Files'} />
              {files.length !== 0 ?


                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <UserListHead
                        headLabel={TABLE_HEAD}
                        rowCount={files.length}
                      />
                      <TableBody >
                        {files.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                          const { _id, title, url, type } = row;

                          return (
                            <TableRow hover key={index} tabIndex={-1} role="checkbox" >

                              <TableCell align='left'>
                                { }
                              </TableCell>
                              <TableCell align='left'>
                                {index + 1}
                              </TableCell>

                              <TableCell align='left'>
                                {title}
                              </TableCell>

                              <TableCell align='left'>
                                {type}
                              </TableCell>

                              <TableCell align='left'>
                                <img alt='thumbnail' height={100} src={getThumbnail(type, url)} />
                              </TableCell>




                              <TableCell align="right" style={{ display: 'flex' }}>

                                <LoadingButton fullWidth size="large" type="submit" style={{ marginTop: '20px', marginRight: '10px', backgroundColor: 'rgba(250,0,0,0.7)' }} variant="contained" onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this file?') === true) {
                                    deleteFile(_id)
                                  }
                                }}>
                                  Delete
                                </LoadingButton>
                                {/* <a href={url} target='_blank' rel="noreferrer"> */}
                                <LoadingButton href={url} fullWidth size="large" target='_blank' rel='norefferer' type="submit" style={{ marginTop: '20px', marginRight: '10px', minWidth:'200px' }} variant="contained">
                                  Open
                                </LoadingButton>
                                {/* </a> */}


                              </TableCell>




                            </TableRow>
                          );
                        })}

                      </TableBody>


                    </Table>
                  </TableContainer>
                </Scrollbar>


                : null}

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={files.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>


          </Container>

        </Grid>
      </Container>
    </>
  );
}
