import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, TextField, Typography, Paper, Alert,
  Link, IconButton, InputAdornment, Fade, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

function Login() {
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
    showPassword: false
  });
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', {
        correo: formData.correo,
        contrasena: formData.contrasena,
      });

      if (response.status === 200) {
        const usuario = response.data;
        localStorage.setItem('usuarioId', usuario.id);
        localStorage.setItem('authToken', response.headers['authorization']);
        
        setMensaje('Inicio de sesión exitoso ✅');
        setTimeout(() => navigate('/principal'), 800);
      }
    } catch (error) {
      setMensaje(error.response?.data?.message || 'Correo o contraseña inválidos ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        py: 4
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={6}
          sx={{ 
            padding: 4,
            borderRadius: 4,
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[10]
          }}
        >
          <Box textAlign="center" mb={3}>
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                fontWeight: 700,
                color: theme.palette.primary.main
              }}
            >
              Bienvenido
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Ingresa tus credenciales para continuar
            </Typography>
          </Box>

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              fullWidth
              margin="normal"
              label="Correo electrónico"
              type="email"
              value={formData.correo}
              onChange={handleChange('correo')}
              required
              autoComplete="email"
              autoFocus
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Contraseña"
              type={formData.showPassword ? 'text' : 'password'}
              value={formData.contrasena}
              onChange={handleChange('contrasena')}
              required
              autoComplete="current-password"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
                      edge="end"
                    >
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
            </Button>

            <Fade in={!!mensaje}>
              <Alert 
                severity={mensaje.includes('exitoso') ? 'success' : 'error'} 
                sx={{ mt: 2 }}
              >
                {mensaje}
              </Alert>
            </Fade>
          </Box>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              ¿No tienes cuenta?{' '}
              <Link 
                component="button" 
                onClick={() => navigate('/registro')}
                sx={{ fontWeight: 600 }}
              >
                Regístrate aquí
              </Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}

export default Login;
