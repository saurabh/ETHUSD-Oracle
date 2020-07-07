Assignment Requirements: 

Need to create the oracle with ETH/USD price feed. In general the app will consist of two parts. The first one is the node.js app, integrated with coinmarketcap API - it will fetch ETH/USD quotes once an hour and push it to the smart contract. Also need to provide two api endpoints (with the help of express.js) for accessing the blockchain: GET /api/v1/quotes - returns exchange rate and POST /api/v1/quotes - it will trigger force requesting coinmarketcap API and then pushing the data to the oracle. The second one is the oracle itself - it must have a storage variable that will store the latest price. The smart contract should log every price change and allow setting of the new value only from a particular address.
Every part should be as simple as possible.
The project should be placed on github.
Note: sensitive data, such as private key for sending of transactions (writing to oracle) or coinmarketcap API key, should be passed from the .env "gitignored" file via environment variables.

Status: Completed.


Project Structure is as follows:

>Ethereum <!-- Folder contains Oracle contract, compiled with [solc](https://www.npmjs.com/package/solc), deployed to Rinkeby -->
cmc.js    <!-- Taken from the coinmarketcap documentation, fetches the ETHUSD price -->
config.js <!-- Exports web3 account and OracleContractObject -->
index.js  <!-- Express app with API endpoints and setInterval -->