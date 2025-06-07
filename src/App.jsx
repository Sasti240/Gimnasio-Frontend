import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet /> 
      </Box>
    </Box>
  );
}

export default App;



