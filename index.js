const express = require('express');
const rp = require('request-promise');
const { getAccounts, oracleObjSetup } = require('./config');
const fetchEthPrice = require('./cmc');

const app = express();

// Calls the /api/v1/quotes Route every hour which in turn pushes the latest ETHUSD price to the contract
setInterval(async () => {
  const requestOptions = {
    method: 'POST',
    uri: `http://127.0.0.1:${PORT}/api/v1/quotes`
  };
  await rp(requestOptions);
}, 3600000);

// Fetches the latest ETHUSD price from the Contract
app.get('/api/v1/quotes', async (req, res) => {
  try {
    const accounts = await getAccounts();
    const oracleObj = oracleObjSetup();
    let currentPrice = await oracleObj.methods
      .currentPrice()
      .call({ from: accounts[0] });
    currentPrice /= 10 ** 9;

    console.log(currentPrice);
    res.status(200).send('Done');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Fetches the latest ETHUSD price from CMC and pushes it to the Contract
app.post('/api/v1/quotes', async (req, res) => {
  try {
    let price = await fetchEthPrice();
    price *= 10 ** 9;
    const accounts = await getAccounts();
    const oracleObj = oracleObjSetup();

    const tx = await oracleObj.methods.updatePrice(price).send({ from: accounts[0] });
    console.log(tx);
    res.status(200).send('Done');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
