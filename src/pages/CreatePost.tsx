import {
  Box,
  Button,
  MenuItem,
  Paper,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBeerContext } from '../context/BeerContext';
import type { Beer } from '../context/BeerContext';

interface BeerFormProps {
  initialData?: Beer;
  isEdit?: boolean;
}

export default function BeerForm({ initialData, isEdit = false }: BeerFormProps) {
  const { addBeer, updateBeer } = useBeerContext();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [abv, setAbv] = useState('');
  const [rating, setRating] = useState(0);
  const [addedBy, setAddedBy] = useState('');

  const types = ['Lager', 'IPA', 'Stout', 'Ale', 'Pilsner'];

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setType(initialData.type);
      setAbv(initialData.abv.toString());
      setRating(initialData.rating);
      setAddedBy(initialData.addedBy);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const beer: Beer = {
      id: isEdit && initialData ? initialData.id : Date.now(),
      name,
      description,
      type,
      abv: parseFloat(abv),
      rating,
      addedBy,
    };

    isEdit ? updateBeer(beer) : addBeer(beer);
    navigate('/');
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <form onSubmit={handleSubmit}>

          <TextField
            label="Beer Name (ex. Bud Light Platinum)"
            variant="standard"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            select
            label="Pick a Type"
            variant="standard"
            fullWidth
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ mb: 3 }}
          >
            {types.map((typeOption) => (
              <MenuItem key={typeOption} value={typeOption}>
                {typeOption}
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ bgcolor: '#673ab7' }}
          >
            {isEdit ? 'Update Post' : 'Submit Post'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
