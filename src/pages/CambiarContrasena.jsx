import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Paper,
  Alert,
  InputAdornment
} from '@mui/material';
import { LockReset as LockResetIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CambiarContrasena() {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem('usuarioId');
    if (!id) {
      setError('Usuario no autenticado');
      return;
    }

    if (nueva !== confirmacion) {
      setError('La nueva contraseña no coincide con la confirmación');
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/usuarios/${id}/cambiar-contrasena`, {
        usuarioId: Number(id),
        contrasenaActual: actual,
        nuevaContrasena: nueva
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMensaje('Contraseña actualizada correctamente ✅');
      setError('');
      setTimeout(() => navigate('/perfil'), 1500);
    } catch (err) {
      setError('Error al cambiar la contraseña. Verifica la contraseña actual.');
      setMensaje('');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <LockResetIcon sx={{ mr: 1, fontSize: 'inherit' }} />
          Cambiar Contraseña
        </Typography>

        {mensaje && <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>{mensaje}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Contraseña Actual"
            type="password"
            fullWidth
            margin="normal"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockResetIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, mt: 0 }}
          />

          <TextField
            label="Nueva Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockResetIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <TextField
            label="Confirmar Nueva Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockResetIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <Box mt={4} display="flex" justifyContent="space-between" gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Guardar Cambios
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/perfil')}
              fullWidth
              size="large"
              sx={{ 
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CambiarContrasena;
