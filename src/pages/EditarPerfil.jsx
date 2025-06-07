import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';

function EditarPerfil() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      const id = localStorage.getItem('usuarioId');
      if (!id) {
        setError('Usuario no autenticado');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/usuarios/${id}`);
        setNombre(response.data.nombre);
        setCorreo(response.data.correo);
        setTelefono(response.data.telefono);
        setContrasena(response.data.contrasena); 
      } catch (err) {
        setError('Error al cargar los datos');
      }
    };

    cargarDatos();
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setLoading(true);

    const id = localStorage.getItem('usuarioId');
    if (!id) {
      setError('Usuario no autenticado');
      setLoading(false);
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/usuarios/${id}`, {
        nombre,
        correo,
        telefono,
        contrasena,
        rol: 'usuario',
      });

      setMensaje('Perfil actualizado con éxito ✅');
      setTimeout(() => navigate('/perfil'), 1000);
    } catch (err) {
      setError('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', py: 4 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 4 }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Editar Perfil
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Actualiza tus datos personales
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleGuardar} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Correo electrónico"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{ width: '48%', py: 1.5, borderRadius: 2, fontSize: '1rem', fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar cambios'}
            </Button>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => navigate('/perfil')}
              sx={{ width: '48%', py: 1.5, borderRadius: 2, fontSize: '1rem', fontWeight: 600, textTransform: 'none' }}
            >
              Cancelar
            </Button>
          </Box>

          {(error || mensaje) && (
            <Box mt={2}>
              {error && <Alert severity="error">{error}</Alert>}
              {mensaje && <Alert severity="success">{mensaje}</Alert>}
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default EditarPerfil;



