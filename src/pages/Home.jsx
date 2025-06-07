import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://fhinstitute.com/wp-content/uploads/2025/02/fitness-park-9.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ color: 'white' }}>
        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            fontWeight: 700,
            mb: 4,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            color: 'white'
          }}
        >
          Transforma tu cuerpo, mejora tu vida
        </Typography>

        <Typography 
          variant="h5" 
          component="p"
          sx={{ 
            mb: 6,
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.8)',
            color: 'white',
            lineHeight: 1.6
          }}
        >
          Únete a nuestro gimnasio, donde podrás conocer la concurrencia actual, las maquinas disponibles, las rutinas y otras funciones.
        </Typography>
              
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/login')}
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: 'white',
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.3s'
            }
          }}
        >
          Ingresa aquí
        </Button>
      </Container>
    </Box>
  );
}

export default Home;