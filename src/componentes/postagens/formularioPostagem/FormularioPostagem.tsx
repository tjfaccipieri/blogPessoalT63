import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Postagem } from '../../../model/Postagem';
import { useNavigate, useParams } from 'react-router-dom';
import { Tema } from '../../../model/Tema';
import { busca, buscaId, post, put } from '../../../service/service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/action';
import { Usuario } from '../../../model/Usuario';
import { useDispatch, useSelector } from 'react-redux';
import './FormularioPostagem.css'

function FormularioPostagem() {
  const navigate = useNavigate();

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const userId = useSelector<TokenState, TokenState["id"]>(
    (state) => state.id
  );

  const dispatch = useDispatch()

  const { id } = useParams<{ id: string }>();

  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
    postagem: null
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
    usuario: null
  });

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    foto: '',
    nome: '',
    usuario: '',
    senha: '',
    postagem: null
  })

  useEffect(() => {
    if(token === ''){ 
      alert('Ta tirando né??? sem token não rola')
      navigate('/login')
    }
  }, [])

  async function getTemas() {
    try {
      await busca('/temas', setTemas, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().contains('403')) {
        alert('Token expirado, logue novamente');
        dispatch(addToken(''))
        navigate('/login');
      }
    }
  }

  async function getPostById(id: string) {
    await busca(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    getTemas();
    if(id !== undefined) {
      getPostById(id)
    }
  }, []);

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [event.target.name]: event.target.value,
      tema: tema,
    });
  }

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
      usuario: usuario
    });
  }, [tema]);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (id !== undefined) {
      try {
        await put('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('foi - atualização')
        navigate('/postagens')
      } catch (error) {
        alert('deu erro');
      }
    } else {
      try {
        await post('/postagens', postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        alert('foi - cadastro')
        navigate('/postagens')
      } catch (error) {
        alert('deu erro');
      }
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={2}>
        <form onSubmit={onSubmit}>
          <Typography variant="h4" align="center">
            Formulário de {id !== undefined ? ' atualização ' : ' cadastro '} de postagem
          </Typography>
          <TextField
            name="titulo"
            fullWidth
            margin="normal"
            label="Titulo da postagem"
            helperText='Pelo menos 5 caracteres'
            value={postagem.titulo}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
          />
          <TextField
            name="texto"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            label="Texto da postagem"
            value={postagem.texto}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="selectTema">Tema</InputLabel>
            <Select
              labelId="selectTema"
              onChange={(event) => 
                buscaId(`/temas/${event.target.value}`, setTema, {
                  headers: {
                    Authorization: token,
                  },
                })
              }
              className='selectPostagem'
            >
              {temas.map((tema) => (
                <MenuItem key={tema.id} value={tema.id}>
                  {tema.descricao}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Escolha um tema para a sua postagem</FormHelperText>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={tema.id === 0}>
            {id !== undefined ? 'Atualizar Postagem' : 'Cadastrar Postagem'}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default FormularioPostagem;
