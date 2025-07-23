import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from '@mui/material';
import { useBeerContext } from '../context/BeerContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { beers, deleteBeer, updateBeer } = useBeerContext();
  const sortedBeers = [...beers].sort((a, b) => b.id - a.id);
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} p={3}>
      {sortedBeers.map((beer) => (
        <Grid item key={beer.id} xs={12} sm={6} md={4}>
          <Card
            sx={{
              height: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{beer.name}</Typography>
              <Typography variant="body2">{beer.type}</Typography>
              <Typography variant="body2">ABV: {beer.abv}%</Typography>
              <Typography variant="body2">Rating: {beer.rating}</Typography>

              <Box
                sx={{
                  maxHeight: 80,
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  mt: 1,
                  p: 1,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {beer.description}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ fontStyle: 'italic', mt: 1 }}
              >
                Added by: {beer.addedBy}
              </Typography>
            </CardContent>

            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Button
                  size="small"
                  color="error"
                  onClick={() => deleteBeer(beer.id)}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  sx={{ color: '#ff9800', ml: 1 }}
                  onClick={() => navigate(`/edit/${beer.id}`)}
                >
                  Edit
                </Button>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  fontStyle: 'italic',
                  color: 'text.secondary',
                  pr: 1.5,
                }}
              >
                Added by: {beer.addedBy}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
