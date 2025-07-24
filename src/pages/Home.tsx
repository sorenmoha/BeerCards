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
  const { beers, deleteBeer } = useBeerContext();
  const sortedBeers = [...beers].sort((a, b) => b.id - a.id);
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} p={3}>
      {sortedBeers.map((beer) => (
        <Grid>
          <Card
            sx={{
              height: 400,
              width: 350,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',

            }}
          >
            <CardContent
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                overflow: 'hidden',
              }}
            >
              <Typography variant="h5">{beer.name}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Type: {beer.type}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                ABV: {beer.abv}%
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
                Rating: {beer.rating}/10
              </Typography>

              <Box
                sx={{
                  maxHeight: 150,
                  maxWidth: '100%',
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
                    overflowWrap: 'break-word',
                  }}
                >
                  {beer.description}
                </Typography>
              </Box>

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
