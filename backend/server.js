// Load environment variables from .env
require('dotenv').config();

const express = require('express');
const axios   = require('axios');
const cors    = require('cors');
const pool = require('./db');

// Create your Express app
const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware — runs on every request
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────
// ENDPOINT 1: Health check
// GET /api/health
// ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'MoodCast API is running',
    timestamp: new Date()
  });
});

// ─────────────────────────────────────────
// ENDPOINT 2: Get a joke by category
// GET /api/joke/:category
// ─────────────────────────────────────────
app.get('/api/joke/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/${category}`,
      { params: { type: 'single' } }
    );
    res.json({
      success: true,
      category: response.data.category,
      joke: response.data.joke
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch joke',
      error: error.message
    });
  }
});

// ─────────────────────────────────────────
// ENDPOINT 3: Get a motivational quote
// GET /api/quote
// ─────────────────────────────────────────
app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    const data = response.data[0];
    res.json({
      success: true,
      quote:   data.q,
      author:  data.a
    });
  } catch (error) {
    // Fallback quote if API fails
    res.json({
      success: true,
      quote:   'The only way to do great work is to love what you do.',
      author:  'Steve Jobs'
    });
  }
});

// ─────────────────────────────────────────
// ENDPOINT 4: Mood response
// GET /api/mood/:mood
// ─────────────────────────────────────────
app.get('/api/mood/:mood', (req, res) => {
  const { mood } = req.params;

  const moodResponses = {
    happy:   { emoji: '😄', message: 'Keep that energy!',     playlist: 'Good Vibes'    },
    sad:     { emoji: '😢', message: 'This too shall pass.',   playlist: 'Healing Sounds' },
    focused: { emoji: '🎯', message: 'In the zone!',           playlist: 'Deep Focus'    },
    anxious: { emoji: '😰', message: 'Breathe. You got this.', playlist: 'Calm & Steady' },
    angry:   { emoji: '😤', message: 'Channel it.',            playlist: 'Release'       }
  };

  const result = moodResponses[mood.toLowerCase()];

  if (!result) {
    return res.status(404).json({
      success: false,
      message: `Mood "${mood}" not recognized`,
      availableMoods: Object.keys(moodResponses)
    });
  }

  res.json({ success: true, mood, ...result });
});

// ─────────────────────────────────────────
// ENDPOINT 5: Save a mood to the database
// POST /api/mood/save
// ─────────────────────────────────────────
app.post('/api/mood/save', async (req, res) => {
  const { mood, emoji, message, playlist } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO moods (mood, emoji, message, playlist) VALUES ($1, $2, $3, $4) RETURNING *',
      [mood, emoji, message, playlist]
    );

    res.status(201).json({
      success: true,
      message: 'Mood saved to database',
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save mood',
      error: error.message
    });
  }
});

// ─────────────────────────────────────────
// ENDPOINT 6: Get all saved moods from database
// GET /api/moods
// ─────────────────────────────────────────
app.get('/api/moods', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM moods ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve moods',
      error: error.message
    });
  }
});

// ─────────────────────────────────────────
// START THE SERVER
// ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 MoodCast API running at http://localhost:${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET http://localhost:${PORT}/api/health`);
  console.log(`  GET http://localhost:${PORT}/api/joke/:category`);
  console.log(`  GET http://localhost:${PORT}/api/quote`);
  console.log(`  GET http://localhost:${PORT}/api/mood/:mood`);
});