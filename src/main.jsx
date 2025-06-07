import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home'; 
import Login from './pages/Login';
import Registro from './pages/Registro';
import Principal from './pages/Principal';
import Concurrencia from './pages/Concurrencia';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import CambiarContrasena from './pages/CambiarContrasena';
import Maquinas from './pages/Maquinas';
import Rutinas from './pages/Rutinas';
import App from './App'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}> 
            <Route index element={<Home />} /> 
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Registro />} />
            <Route path="principal" element={<Principal />} />
            <Route path="concurrencia" element={<Concurrencia />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="perfil/editar" element={<EditarPerfil />} />
            <Route path="perfil/cambiar-contrasena" element={<CambiarContrasena />} />
            <Route path="maquinas" element={<Maquinas />} />
            <Route path="rutinas" element={<Rutinas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);