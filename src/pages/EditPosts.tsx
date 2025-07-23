// src/pages/EditPost.tsx
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Slider,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import { useBeerContext } from '../context/BeerContext';
import { useEffect, useState } from 'react';

export default function EditPost() {
  const { id } = useParams();
  const { beers, updateBeer } = useBeerContext();
  const navigate = useNavigate();

  const beer = beers.find((b) => b.id === Number(id));

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [abv, setAbv] = useState('');
  const [rating, setRating] = useState(0);
  const [addedBy, setAddedBy] = useState('');

  const types = ['Lager', 'IPA', 'Stout', 'Ale', 'Pilsner'];

  useEffect(() => {
    if (beer) {
      setName(beer.name);
      setDescription(beer.description);
      setType(beer.type);
      setAbv(String(beer.abv));
      setRating(beer.rating);
      setAddedBy(beer.addedBy || '');
    }
  }, [beer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated = {
      ...beer!,
      name,
      description,
      type,
      abv: parseFloat(abv),
      rating,
      addedBy,
    };

    updateBeer(updated);
    navigate('/');
  };

  if (!beer) return <Typography>Beer not found.</Typography>;

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Beer Name"
            variant="standard"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            select
            label="Type"
            variant="standard"
            fullWidth
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ mb: 3 }}
          >
            {types.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="ABV %"
            type="number"
            variant="standard"
            fullWidth
            required
            value={abv}
            onChange={(e) => setAbv(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom>User Rating (0-10)</Typography>
          <Slider
            value={rating}
            onChange={(e, val) => setRating(val as number)}
            step={1}
            marks
            min={0}
            max={10}
            valueLabelDisplay="auto"
            sx={{ mb: 3 }}
          />

          <TextField
            label="What did you think?"
            multiline
            rows={4}
            fullWidth
            required
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            label="Your Name"
            variant="standard"
            fullWidth
            required
            value={addedBy}
            onChange={(e) => setAddedBy(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: '#673ab7' }}>
            Save Changes
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
