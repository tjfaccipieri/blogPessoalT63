import React from 'react'
import './Login.css'
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <Grid container alignItems={'center'}>
        <Grid item xs={6}>
          <Box display={'flex'} justifyContent={'center'}>
            <Grid xs={6} gap={2} display={'flex'} flexDirection={'column'}>
            <form>
              <Box display={'flex'} flexDirection={'column'} gap={2}>
                <Typography align='center' variant='h3'>Login</Typography>
                <TextField label='Nome de usuário' />
                <TextField label='Senha' type='password' />
                <Link to='/home'>
                  <Button fullWidth variant='contained'>
                    Logar
                    </Button>
                </Link>
              </Box>
            </form>
            <hr />
            <Typography variant="body1" align='center' >Ainda não tem uma conta? Cadastre-se</Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6} className='imagemLogin'></Grid>
        
      </Grid>
    </>
  )
}

export default Login