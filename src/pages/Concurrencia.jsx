import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Button, Paper, LinearProgress, 
  Divider, Chip, Grid
} from '@mui/material';
import {
  People as PeopleIcon, CardMembership as MembershipIcon,
  Schedule as ScheduleIcon, Home as HomeIcon
} from '@mui/icons-material';

function Concurrencia() {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const obtenerConcurrencia = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/concurrencia', {
          headers: { 'Cache-Control': 'no-cache' }
        });
        if (isMounted) setDatos(response.data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    obtenerConcurrencia();
    const intervalo = setInterval(obtenerConcurrencia, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalo);
    };
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Button variant="outlined" startIcon={<HomeIcon />} onClick={() => navigate('/principal')}>
          Volver
        </Button>
        <Typography variant="h4" fontWeight="bold" sx={{ flex: 1, textAlign: 'center' }}>
          Concurrencia en Tiempo Real
        </Typography>
        <Box sx={{ width: 100 }} />
      </Box>

      {loading && !datos && <LinearProgress sx={{ mb: 3 }} />}

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              <PeopleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Personas en el gimnasio
            </Typography>
            <Typography variant="h2" fontWeight="bold" color="primary">
              {datos?.personasDentro || '--'}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              <MembershipIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Con membresía activa
            </Typography>
            <Typography variant="h2" fontWeight="bold">
              {datos?.usuariosConMembresiaActiva || '--'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Chip
            icon={<ScheduleIcon />}
            label={`Última actualización: ${new Date().toLocaleTimeString()}`}
            variant="outlined"
            sx={{ px: 2 }}
          />
        </Box>
      </Paper>
    </Container>
  );
}

export default Concurrencia;


