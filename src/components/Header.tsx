import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <AppBar position="static" sx={{ bgcolor: '#673ab7' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Left section: Logo + New Post */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            Beer Cards
          </Typography>

          {isLoggedIn && (
            <Button
              component={Link}
              to="/create"
              sx={{
                color: '#ffc107',
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              New Post
            </Button>
          )}
        </Box>

        {/* Right section: Login/Logout */}
        <Button
          onClick={isLoggedIn ? logout : login}
          sx={{
            color: 'white',
            border: '1px solid white',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
