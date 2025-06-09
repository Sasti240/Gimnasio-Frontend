import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Container,
  Paper,
  InputAdornment,
  Link
} from '@mui/material';
import { Person, Email, Lock, Phone } from '@mui/icons-material';
import { motion } from 'framer-motion';

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    telefono: ''
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (campo) => (e) => {
    setFormData(prev => ({ ...prev, [campo]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.contrasena !== formData.confirmarContrasena) {
      setMensaje('Las contraseñas no coinciden ❌');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/usuarios`, {
        ...formData,
        rol: 'usuario',
      });

      if (response.status === 201 || response.status === 200) {
        setMensaje('Usuario registrado exitosamente ✅ Redirigiendo...');
        setFormData({ nombre: '', correo: '', contrasena: '', confirmarContrasena: '', telefono: '' });
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (error) {
      const errorMsg = error.response?.status === 409 
        ? 'El correo ya está registrado ❌'
        : 'Error al registrar usuario ❌';
      setMensaje(errorMsg);
    }
  };

  const inputFields = [
    { name: 'nombre', label: 'Nombre completo', type: 'text', icon: Person, required: true },
    { name: 'correo', label: 'Correo electrónico', type: 'email', icon: Email, required: true },
    { name: 'contrasena', label: 'Contraseña', type: 'password', icon: Lock, required: true },
    { name: 'confirmarContrasena', label: 'Confirmar contraseña', type: 'password', icon: Lock, required: true },
    { name: 'telefono', label: 'Teléfono', type: 'tel', icon: Phone, required: false }
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
            Crear Cuenta
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {inputFields.map(({ name, label, type, icon: Icon, required }) => (
              <TextField
                key={name}
                label={label}
                type={type}
                fullWidth
                margin="normal"
                value={formData[name]}
                onChange={handleChange(name)}
                required={required}
                error={name === 'confirmarContrasena' && formData.contrasena !== formData.confirmarContrasena && formData.confirmarContrasena !== ''}
                helperText={name === 'confirmarContrasena' && formData.contrasena !== formData.confirmarContrasena && formData.confirmarContrasena !== '' ? 'Las contraseñas no coinciden' : ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            ))}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  transform: 'translateY(-2px)',
                  transition: 'transform 0.2s'
                }
              }}
            >
              Crear Cuenta
            </Button>

            {mensaje && (
              <Alert
                severity={mensaje.includes('exitosamente') ? 'success' : 'error'}
                sx={{ mt: 2, borderRadius: 2 }}
              >
                {mensaje}
              </Alert>
            )}

            <Box mt={3} textAlign="center">
              <Typography variant="body2">
                ¿Ya tienes una cuenta?{' '}
                <Link component="button" onClick={() => navigate('/login')} sx={{ fontWeight: 600 }}>
                  Inicia sesión aquí
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
}

export default Registro;