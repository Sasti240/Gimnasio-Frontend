import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Button, Paper, List, ListItem, 
  ListItemText, Divider, Select, MenuItem, FormControl, 
  InputLabel, Chip, IconButton
} from '@mui/material';
import { 
  Today as TodayIcon, Delete as DeleteIcon, Home as HomeIcon
} from '@mui/icons-material';

function Rutinas() {
  const [rutinas, setRutinas] = useState([]);
  const [rutinasAsignadas, setRutinasAsignadas] = useState([]);
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState('');
  const navigate = useNavigate();
  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    if (!usuarioId) return;

    axios.get('http://localhost:8080/api/rutinas')
      .then(response => setRutinas(response.data))
      .catch(error => console.error('Error:', error));

    cargarRutinasAsignadas();
  }, [usuarioId]);

  const cargarRutinasAsignadas = () => {
    if (!usuarioId) return;
    
    axios.get(`http://localhost:8080/api/rutinas-usuario/${usuarioId}`)
      .then(response => setRutinasAsignadas(response.data))
      .catch(error => console.error('Error:', error));
  };

  const asignarRutina = () => {
    if (!rutinaSeleccionada || !usuarioId) return;

    const payload = {
      usuarioId: Number(usuarioId), 
      rutinaId: Number(rutinaSeleccionada) 
    };

    axios.post('http://localhost:8080/api/rutinas-usuario', payload)
      .then(() => {
        cargarRutinasAsignadas();
        setRutinaSeleccionada('');
      })
      .catch(error => console.error('Error:', error));
  };

  const eliminarRutinaAsignada = (idAsignacion) => {
    axios.delete(`http://localhost:8080/api/rutinas-usuario/${idAsignacion}`)
      .then(() => cargarRutinasAsignadas())
      .catch(error => console.error('Error:', error));
  };

  if (!usuarioId) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Error: No se pudo identificar al usuario. Por favor inicia sesión nuevamente.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Button variant="outlined" startIcon={<HomeIcon />} onClick={() => navigate('/principal')}>
          Volver
        </Button>
        <Typography variant="h4" fontWeight="bold" sx={{ flex: 1, textAlign: 'center' }}>
          Mis Rutinas Diarias
        </Typography>
        <Box sx={{ width: 100 }} />
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Selecciona una rutina para hoy:
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl fullWidth>
            <InputLabel>Rutinas disponibles</InputLabel>
            <Select
              value={rutinaSeleccionada}
              onChange={(e) => setRutinaSeleccionada(e.target.value)}
              label="Rutinas disponibles"
            >
              {rutinas.map((rutina) => (
                <MenuItem key={rutina.id} value={rutina.id}>
                  {rutina.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            variant="contained" 
            onClick={asignarRutina}
            disabled={!rutinaSeleccionada || !usuarioId}
            sx={{ height: '56px' }}
          >
            Asignar
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tus rutinas asignadas:
        </Typography>
        
        {rutinasAsignadas.length > 0 ? (
          <List>
            {rutinasAsignadas.map((asignacion) => {
              const rutina = rutinas.find(r => r.id === (asignacion.rutinaId || asignacion.rutina?.id));
              return (
                <React.Fragment key={asignacion.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => eliminarRutinaAsignada(asignacion.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={rutina?.nombre || asignacion.rutina?.nombre || 'Rutina no encontrada'}
                      secondary={
                        <>
                          <Box component="span" display="block">
                            {rutina?.descripcion || asignacion.rutina?.descripcion}
                          </Box>
                          <Chip 
                            icon={<TodayIcon fontSize="small" />}
                            label={`Asignada el: ${asignacion.fechaAsignacion}`}
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No tienes rutinas asignadas. ¡Selecciona una arriba!
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default Rutinas;