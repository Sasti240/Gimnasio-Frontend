import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Stack, useTheme, 
  Grid, Paper, Divider
} from '@mui/material';
import {
  Person as PersonIcon, AccessibilityNew as RoutinesIcon,
  FitnessCenter as MachinesIcon, People as PeopleIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';

function Principal() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeView, setActiveView] = useState('perfil');

  const btnStyle = {
    justifyContent: 'flex-start',
    textTransform: 'none',
    py: 1.5,
    px: 3,
    borderRadius: 2,
    '&:hover': { backgroundColor: theme.palette.action.hover },
  };

  const activeBtnStyle = {
    ...btnStyle,
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    '&:hover': { backgroundColor: theme.palette.primary.dark },
  };

  const sections = [
    { key: 'perfil', icon: PersonIcon, title: 'Tu Perfil', desc: 'Aquí puedes ver y editar tu información personal.', route: '/perfil', btnText: 'Ver perfil completo' },
    { key: 'rutinas', icon: RoutinesIcon, title: 'Tus Rutinas', desc: 'Consulta y gestiona tus rutinas de entrenamiento.', route: '/rutinas', btnText: 'Ver todas mis rutinas' },
    { key: 'maquinas', icon: MachinesIcon, title: 'Máquinas Disponibles', desc: 'Consulta el estado y disponibilidad de las máquinas.', route: '/maquinas', btnText: 'Ver todas las máquinas' },
    { key: 'concurrencia', icon: PeopleIcon, title: 'Concurrencia Actual', desc: 'Personas actualmente en el gimnasio.', route: '/concurrencia', btnText: 'Ver detalles' }
  ];

  const currentSection = sections.find(s => s.key === activeView);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold" mb={4}>
        Bienvenido al Gimnasio
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <Stack spacing={1}>
              {sections.map(({ key, icon: Icon, title }) => (
                <Button
                  key={key}
                  startIcon={<Icon />}
                  sx={activeView === key ? activeBtnStyle : btnStyle}
                  onClick={() => setActiveView(key)}
                >
                  {title.replace('Tu ', '').replace('Tus ', '').replace(' Disponibles', '').replace(' Actual', '')}
                </Button>
              ))}

              <Divider sx={{ my: 1 }} />

              <Button
                startIcon={<LogoutIcon />}
                sx={btnStyle}
                onClick={() => navigate('/login')}
                color="error"
              >
                Cerrar sesión
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, minHeight: '60vh' }}>
            {currentSection && (
              <Box>
                <Typography variant="h5" gutterBottom>{currentSection.title}</Typography>
                <Typography>{currentSection.desc}</Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate(currentSection.route)}
                  sx={{ mt: 2 }}
                >
                  {currentSection.btnText}
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Principal;