import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#673ab7' }}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          px: { xs: 2, sm: 3 }, // responsive horizontal padding
        }}
      >
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

        <Button
          component={Link}
          to="/create"
          sx={{
            color: '#ffc107',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          New Post
        </Button>
      </Toolbar>
    </AppBar>
  );
}
