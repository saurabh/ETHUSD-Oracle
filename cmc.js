const rp = require('request-promise');
require('dotenv').config();

const requestOptions = {
  method: 'GET',
  // ?start=1&limit=5000&convert=USD
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '2',
    'limit': '1',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': `${process.env.CMC_API_KEY}`
  },
  json: true,
  gzip: true
};

const fetchEthPrice = async () => {
  try {
    const response = await rp(requestOptions);
    return response.data[0].quote.USD.price;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = fetchEthPrice;
