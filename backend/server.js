const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 5550;

// Use CORS middleware
app.use(cors());

app.get('/vehicles', async (req, res) => {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/8wbx-tsch.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
