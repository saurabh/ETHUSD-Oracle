const express = require('express');
const fetchEthPrice = require('./cmc');

const app = express();

// TODO
app.get('/api/v1/quotes', async (req, res) => {
});

// WIP
app.post('/api/v1/quotes', async (req, res) => {
  try {
    const price = await fetchEthPrice();

  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));