import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Postagem } from '../../../model/Postagem';
import { buscaId, deleteId } from '../../../service/service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function DeletarPostagem() {
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate()

  const [post, setPost] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
  });

  async function getById(id: string) {
    await buscaId(`/postagens/${id}`, setPost, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if(token === ''){ 
      alert('Ta tirando né??? sem token não rola')
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    if (id !== undefined) {
      getById(id);
    }
  }, []);

  function back(){
    navigate('/postagens')
  }

  function apagarPostagem() {
    deleteId(`/postagens/${id}`, {
      headers: {
        Authorization: token
      }
    })
    alert('postagem apagada com sucesso')
    back()
  }

  return (
    <>
      <Grid container justifyContent={'center'} my={2}>
        <Grid item xs={4}>
          <Typography variant="h5" align="center">
            Tem certeza de que quer apagar a postagem?
          </Typography>
          <Grid
            item
            xs={12}
            border={1}
            borderRadius={2}
            borderColor={'lightgray'}
            p={2}
          >
            <Typography>Postagem:</Typography>
            <Typography>{post.titulo}</Typography>
            <Typography>{post.texto}</Typography>
            <Typography>Tema: {post.tema?.descricao}</Typography>

            <Box display={'flex'} gap={4}>
              <Button fullWidth variant="contained" color="primary" onClick={back}>
                cancelar
              </Button>
              <Button fullWidth variant="contained" color="secondary" onClick={apagarPostagem}>
                apagar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default DeletarPostagem;
