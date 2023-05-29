import './App.css'
import Footer from './componentes/estaticos/footer/Footer'
import Navbar from './componentes/estaticos/navbar/Navbar'
import Home from './paginas/home/Home'
import { Route, BrowserRouter, Routes} from 'react-router-dom'
import Login from './paginas/login/Login'
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario'
import ListaPostagens from './componentes/postagens/listaPostagens/ListaPostagens'
import ListaTemas from './componentes/temas/listaTemas/ListaTemas'
import CadastrarTema from './componentes/temas/cadastrarTema/CadastrarTema'
import DeletarTema from './componentes/temas/deletarTema/DeletarTema'
import FormularioPostagem from './componentes/postagens/formularioPostagem/FormularioPostagem'
import DeletarPostagem from './componentes/postagens/deletarPostagem/DeletarPostagem'
import { Provider } from 'react-redux'
import store from './store/store'
import Perfil from './paginas/perfil/Perfil'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <div style={{minHeight: '85vh'}}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cadastro' element={<CadastroUsuario />} />
            <Route path='/postagens' element={<ListaPostagens />} />
            <Route path='/formularioPostagem' element={<FormularioPostagem />} />
            <Route path='/formularioPostagem/:id' element={<FormularioPostagem />} />
            <Route path='/apagarPostagem/:id' element={<DeletarPostagem />} />
            <Route path='/temas' element={<ListaTemas />} />
            <Route path='/formularioTema' element={<CadastrarTema />} />
            <Route path='/formularioTema/:id' element={<CadastrarTema />} />
            <Route path='/apagarTema/:id' element={<DeletarTema />} />
            <Route path='/perfil' element={<Perfil />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}

export default App