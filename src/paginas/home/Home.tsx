import React from 'react';
import './Home.css';
import { Box, Grid, Paper, Typography } from '@mui/material';
function Home() {
  return (
    <Grid container gap={4} alignItems={'center'} justifyContent={'center'} style={{backgroundColor: '#3e5997'}}>
      <Grid item xs={4}>
        <Box p={8} color={'white'}>
          <Typography align='center' fontWeight={900} variant='h3'>Bem vindo ao blog pessoal</Typography>
          <Typography align='center' variant='body1'>Digita uns textos dahora pra nóis ai...</Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <img src="https://i.imgur.com/9OZAbB5.png" alt="" width={'100%'} />
      </Grid>
    </Grid>
  );
}

export default Home;
