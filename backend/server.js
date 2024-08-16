// server.js

const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movie');

const app = express();
const port = 3000;

// Connect to MongoDB Atlas
const dbURI = 'mongodb+srv://saivenkatnarayanamekala:saivenkatnarayana%402024@cluster0.fjadlsp.mongodb.net/moviesDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Could not connect to MongoDB Atlas', error));

app.use(express.json());

// GET all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single movie by ID
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new movie
app.post('/movies', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre,
    director: req.body.director,
    rating: req.body.rating
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a movie by ID
app.put('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a movie by ID
app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (movie) {
      res.status(200).json({ message: 'Movie deleted' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
