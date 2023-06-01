import React, { ChangeEvent, useEffect, useState } from 'react';
import './Login.css';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { UsuarioLogin } from '../../model/UsuarioLogin';
import { login } from '../../service/service';
import { useDispatch } from 'react-redux';
import { addId, addToken } from '../../store/tokens/action';
import { toast } from 'react-toastify';

function Login() {
  // cria a variavel para navegação interna pela rota
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // cria um estado para armazenamento no localStorage do navegador
  const [token, setToken] = useState('');

  // cria um estado de controle para o usuário preencher os dados de login
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: '',
  });
  const [respUsuarioLogin, setRespUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
    token: '',
  });

  // atualiza os dados do estado acima, e ajuda a formar o JSON para a requisição
  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [event.target.name]: event.target.value,
    });
  }

  // função que envia o formulário para o backend
  async function enviar(event: ChangeEvent<HTMLFormElement>) {
    // previne que o formulario atualize a pagina
    event.preventDefault();
    try {
      await login('/usuarios/logar', usuarioLogin, setRespUsuarioLogin);
      // alert('Usuario logado com sucesso');
      toast.success('Usuário logado com sucesso', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    } catch (error) {
      // alert('Usuário e/ou senha inválidos');
      toast.error('Usuário e/ou senha inválidos', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  }

  // Efeito que fica de olho no token, e quando chega algo diferente de vazio, navega o usuario pra home
  useEffect(() => {
    if (token !== '') {
      // dispatch(addToken(token))
      // navigate('/home');
    }
  }, [token]);

  useEffect(() => {
    if(respUsuarioLogin.token !== ''){
      dispatch(addToken(respUsuarioLogin.token))
      dispatch(addId(respUsuarioLogin.id.toString()))
      navigate('/home');
      console.log({respUsuarioLogin});
    }
  }, [respUsuarioLogin.token])

  return (
    <>
      <Grid container alignItems={'center'}>
        <Grid item xs={6}>
          <Box display={'flex'} justifyContent={'center'}>
            <Grid item xs={6} gap={2} display={'flex'} flexDirection={'column'}>
              <form onSubmit={enviar}>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography align="center" variant="h3">
                    Logar nessa maravilha de blog
                  </Typography>

                  <TextField
                    name="usuario"
                    label="Nome de usuário"
                    value={usuarioLogin.usuario}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      updateModel(event)
                    }
                  />

                  <TextField
                    name="senha"
                    label="Senha"
                    type="password"
                    error={usuarioLogin.senha.length < 8 && usuarioLogin.senha.length > 0}
                    helperText={usuarioLogin.senha.length < 8 && usuarioLogin.senha.length > 0 ? 'Tem que ter mais de 8 caracteres' : ''}
                    value={usuarioLogin.senha}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      updateModel(event)
                    }
                  />
                  <Button fullWidth variant="contained" type="submit">
                    Logar
                  </Button>
                </Box>
              </form>
              <hr />
              <Typography variant="body1" align="center">
                Ainda não tem uma conta? <Link to="/cadastro" style={{textDecoration: 'underline'}}>Cadastre-se</Link>
              </Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6} className="imagemLogin"></Grid>
      </Grid>
    </>
  );
}

export default Login;
