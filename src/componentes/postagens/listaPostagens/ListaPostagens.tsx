import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../estaticos/navbar/Navbar'
import {Button} from '@material-ui/core'

function ListaPostagens() {
  return (
    <>
      <Grid container m={2}>
        <Box display='flex' flexWrap={'wrap'} width={'100%'}>
          <Grid item xs={3} border={1} borderRadius={2} borderColor={'lightgray'} p={2}>
            <Typography>Postagem:</Typography>
            <Typography>Titulo da postagem</Typography>
            <Typography>Texto da postagem</Typography>
            <Typography>data da postagem</Typography>
            <Box display={'flex'} gap={4}>
              <Button fullWidth variant='contained' color='primary'>editar</Button>
              <Button fullWidth variant='contained' color='secondary'>apagar</Button>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export default ListaPostagens