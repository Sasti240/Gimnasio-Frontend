import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Lock as LockIcon,
  Home as HomeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CardMembership as MembershipIcon,
} from '@mui/icons-material';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPerfil = async () => {
      const id = localStorage.getItem('usuarioId');
      if (!id) {
        setError('Usuario no autenticado');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/usuarios/${id}/perfil`);
        setUsuario(response.data);
      } catch (err) {
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !usuario) {
    return (
      <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography color="error" variant="h6" gutterBottom>
          {error || 'No se encontraron datos del usuario'}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/principal')} sx={{ mt: 2 }}>
          Volver al menú
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/principal')}
          sx={{ mr: 2, textTransform: 'none', padding: '8px 16px' }}
        >
          Volver
        </Button>
        <Typography variant="h4" fontWeight="bold" align="center" sx={{ flex: 1 }}>
          Perfil de Usuario
        </Typography>
        <Box sx={{ width: 100 }} />
      </Box>

      <Paper elevation={4} sx={{ borderRadius: 4, overflow: 'hidden', p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            {usuario.nombre}
          </Typography>
          <Chip
            label={usuario.membresiaActiva ? 'Membresía Activa' : 'Sin membresía activa'}
            color={usuario.membresiaActiva ? 'success' : 'error'}
            variant="filled"
            size="medium"
            sx={{ fontWeight: 'bold', fontSize: '1rem', py: 1 }}
            icon={<MembershipIcon />}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Información Personal
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmailIcon color="action" sx={{ mr: 2 }} />
            <Typography variant="body1">
              <strong>Correo:</strong> {usuario.correo}
            </Typography>
          </Box>

          {usuario.telefono && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon color="action" sx={{ mr: 2 }} />
              <Typography variant="body1">
                <strong>Teléfono:</strong> {usuario.telefono}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate('/perfil/editar')}
            sx={{ px: 4, py: 1.5, minWidth: 200 }}
          >
            Editar Perfil
          </Button>

          <Button
            variant="contained"
            startIcon={<LockIcon />}
            onClick={() => navigate('/perfil/cambiar-contrasena')}
            color="secondary"
            sx={{ px: 4, py: 1.5, minWidth: 200 }}
          >
            Cambiar Contraseña
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Perfil;
