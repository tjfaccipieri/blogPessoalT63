import './App.css'
import Footer from './componentes/estaticos/footer/Footer'
import Navbar from './componentes/estaticos/navbar/Navbar'
import Home from './paginas/home/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './paginas/login/Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div style={{minHeight: '85vh'}}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App