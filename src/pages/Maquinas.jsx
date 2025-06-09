import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  LinearProgress,
  Alert,
  Grid,
  Chip,
  Divider,
  Button
} from '@mui/material';
import { FitnessCenter as MaquinaIcon, Info as InfoIcon, Home as HomeIcon } from '@mui/icons-material';

function MaquinasList() {
  const [maquinas, setMaquinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMaquinas = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/maquinas`);
      setMaquinas(response.data.map(m => ({
        _id: m.id,
        nombre: m.nombre,
        descripcion: m.descripcion,
        estado: m.estado.toLowerCase(),
        imagenUrl: m.imagenUrl
      })));
    } catch (err) {
      setError('Error al cargar las máquinas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaquinas();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          Máquinas Disponibles
        </Typography>
        <Box sx={{ width: 100 }} /> 
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {loading && <LinearProgress sx={{ mb: 3 }} />}

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: '100%', margin: 'auto' }}>
        <Grid container spacing={4} justifyContent="center">
          {maquinas.map((maquina) => (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={maquina._id} sx={{ display: 'flex' }}>
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  height: '100%',
                  minHeight: 400,
                  maxHeight: 400,
                  borderLeft: `4px solid ${maquina.estado === 'disponible' ? '#4caf50' : '#f44336'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ height: 180, mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {maquina.imagenUrl ? (
                    <img
                      src={maquina.imagenUrl}
                      alt={maquina.nombre}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: 8
                      }}
                    />
                  ) : (
                    <MaquinaIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5 }} />
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MaquinaIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {maquina.nombre}
                  </Typography>
                </Box>

                <Box sx={{ flex: 1, overflow: 'hidden', mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {maquina.descripcion}
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip
                    icon={<InfoIcon fontSize="small" />}
                    label={maquina.estado === 'disponible' ? 'Disponible' : 'Mantenimiento'}
                    color={maquina.estado === 'disponible' ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {!loading && maquinas.length === 0 && (
          <Typography align="center" sx={{ mt: 3, color: 'text.secondary' }}>
            No hay máquinas registradas
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default MaquinasList;